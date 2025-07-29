from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from . import models, auth, crud, integrations, scheduler

Base.metadata.create_all(bind=engine)
app = FastAPI(title="SOC Virtual API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@scheduler.start_scheduler(app)
@app.post("/api/token")
async def login(form_data: auth.OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise auth.HTTPException(status_code=400, detail="Incorrect credentials")
    access_token = auth.create_access_token({"sub": user.username})
    crud.log_action(db, user.id, "login", f"User {user.username} logged in")
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/events")
def get_events(current_user: models.User = Depends(auth.get_current_user)):
    db = SessionLocal()
    events = []
    events += integrations.fetch_elastic_events()
    events += integrations.fetch_trellix_events()
    events += integrations.fetch_defender_events()
    events_sorted = sorted(events, key=lambda x: x['timestamp'], reverse=True)
    return events_sorted[:10]

@app.get("/api/tenable/surface")
def get_tenable_surface(current_user: models.User = Depends(auth.get_current_user)):
    db = SessionLocal()
    surface = integrations.fetch_tenable_surface()
    return surface
