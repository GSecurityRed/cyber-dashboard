from apscheduler.schedulers.background import BackgroundScheduler
from .integrations import *

def start_scheduler(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=lambda: print('fetch integrations'), trigger='interval', seconds=60)
    scheduler.start()
