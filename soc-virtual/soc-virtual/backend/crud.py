from sqlalchemy.orm import Session
from . import models, auth
from datetime import datetime

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, username: str, password: str, role: models.Role):
    hashed_password = auth.get_password_hash(password)
    db_user = models.User(username=username, hashed_password=hashed_password, role=role)
    db.add(db_user); db.commit(); db.refresh(db_user)
    return db_user

def log_action(db: Session, user_id: int, action: str, details: str = ""):
    entry = models.AuditLog(user_id=user_id, action=action, details=details, timestamp=datetime.utcnow())
    db.add(entry); db.commit()
    return entry
