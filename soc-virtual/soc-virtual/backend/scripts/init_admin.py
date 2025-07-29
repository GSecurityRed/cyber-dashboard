from database import SessionLocal
from models import Role
from crud import create_user

if __name__ == '__main__':
    db = SessionLocal()
    admin_role = Role(name='admin', description='Acesso completo')
    db.add(admin_role); db.commit(); db.refresh(admin_role)
    create_user(db, 'admin', 'admin123', admin_role)
    print('Admin criado: usuário=admin senha=admin123')
