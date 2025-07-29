import random
from datetime import datetime

def fetch_elastic_events():
    return [{'source':'elastic','severity':random.choice(['info','critical','warning']), 'timestamp':datetime.utcnow(), 'message':'Elastic event'} for _ in range(10)]

def fetch_trellix_events():
    return [{'source':'trellix','severity':random.choice(['info','critical']), 'timestamp':datetime.utcnow(), 'message':'Trellix IPS event'} for _ in range(10)]

def fetch_defender_events():
    return [{'source':'defender','severity':random.choice(['low','high']), 'timestamp':datetime.utcnow(), 'message':'Defender alert'} for _ in range(10)]

def fetch_tenable_surface():
    assets=50; avg_score= random.uniform(0,10)
    vulns={'low':random.randint(10,50),'medium':random.randint(5,30),'high':random.randint(1,10),'critical':random.randint(0,5)}
    return {'assets':assets,'avg_score':round(avg_score,2),'vulnerabilities':vulns}
