import Hospital_Management_System.database.database as db
from Hospital_Management_System.helper.helper import *
import random
import copy
import datetime
from mimesis import *
import mimesis as dgen

# lists for storing generated data
patients = []
patienthistory = []
doctors = []
wards = []
beds = []
emergencyalerts = []
doctorlogin = []
appointments = []
departments = []
labinfos = []
ambulances = []
operationtheaters = []


@HospitalMS
def addtoDataBase(cursor, tablename, data):
    for d in data:
        placeholders = ', '.join(['%s'] * len(d))
        columns = ', '.join(d.keys())
        q = "INSERT INTO %s ( %s ) VALUES ( %s )" % (
            tablename, columns, placeholders)
        cursor.execute(q, list(d.values()))


def createData(num):
    for i in range(random.randint(num//4, num*4)):
        patients.append({
            "name": Person().full_name(),
            "address": Address().address(),
            "mobileNumber": Person().telephone(),
            "email": Person().email(),
            "dob": Datetime().date(start=1990, end=2000),
            "gender": random.choice(["F", "M"])
        })

    temp = ["Accident and emergency", "Admissions", "Breast Screening", "Cardiology", "General Surgery", "Information Management", "Infection Control", "Human Resources"]
    d = ["Consultant", "Intern", "Nurse"]*5
    d.extend(temp)
    for i in range(random.randint(num//16, num//8)):
        departments.append({
            "name": random.choice(d),
            "salary": Numbers().between(minimum=50000, maximum=200000)
        })

    for i in range(random.randint(num//8, num//4)):
        doctors.append({
            "name": Person().full_name(),
            "address": Address().address(),
            "mobileNumber": Person().telephone(),
            "email": Person().email(),
            "dob": Datetime().date(start=1980, end=1990),
            "gender": random.choice(["F", "M"]),
            "department_id": Numbers().between(minimum=1, maximum=len(departments))
        })

    for i in range(random.randint(num//16, num//8)):
        wards.append({
            "wardtype": random.choice(temp)
        })
    
    for i in range(random.randint(num//4, num//2)):
        beds.append({
            "ward_number": Numbers().between(minimum=1, maximum=len(wards)),
            "bed_number": Numbers().between(minimum=1, maximum=100)
        })

    for i in range(random.randint(num, num*3)):
        emergencyalerts.append({
            "timestamp": Datetime().datetime(start=2010, end=2018),
            "message": Text().sentence()
        })

    for i in range(len(doctors)):
        if( departments[doctors[i]["department_id"]-1]["name"] in temp):
            doctorlogin.append({
                "doctor_id": i+1,
                "username": Person().username(),
                "password": Person().password()
            })
    
    for i in range(random.randint(num//4, num//3)):
        tempdoctor = random.randint(0,len(doctors)-1)
        temp2 = departments[doctors[tempdoctor]["department_id"] - 1]["name"]
        while( temp2 not in temp):
            tempdoctor = random.randint(0, len(doctors)-1)
            temp2 = departments[doctors[tempdoctor]["department_id"] - 1]["name"]
            
        appointments.append({
            "patient_id": Numbers().between(minimum=1, maximum=len(patients)),
            "doctor_id": tempdoctor,
            "status": random.choice(["accepted", "rejected", "pending"]),
            "timestamp": Datetime().datetime(start=2014, end=2018)
        })

    for i in range(random.randint(num, num*3)):
        labinfos.append({
            "testresult": Text().sentence()
        })

    for i in range(random.randint(num//16, num//8)):
        ambulances.append({
            "platenumber": Transport().vehicle_registration_code()[:100],
            "type": Transport().car(),
            "status": random.choice(["available", "not available"])
        })

    for i in range(random.randint(num, num*2)):
        tempdate = Datetime().datetime(start=2014, end=2018)
        operationtheaters.append({
            "fromdate": tempdate,
            "todate": Datetime().datetime(start=tempdate.year, end=2018),
            "patient_id": Numbers().between(minimum=1, maximum=len(patients)),
            "doctor_id": Numbers().between(minimum=1, maximum=len(doctors))
        })

    for i in range(random.randint(num, num*4)):
        tempdate = Datetime().date(start=2014, end=2018)
        patienthistory.append({
            "fromdate": tempdate,
            "todate": Datetime().date(start=tempdate.year, end=2018),
            "disease": Text().word(),
            "doctor_id": Numbers().between(minimum=1, maximum=len(doctors)),
            "bed_id": Numbers().between(minimum=1, maximum=len(beds)),
            "report_id": Numbers().between(minimum=1, maximum=len(labinfos)),
            "patient_id": Numbers().between(minimum=1, maximum=len(patients)),
            "prescription": Text().text(quantity=10)

        })


def addData():
    addtoDataBase(tablename="Patients", data=patients)
    addtoDataBase(tablename="Departments", data=departments)
    addtoDataBase(tablename="Doctors", data=doctors)
    addtoDataBase(tablename="Wards", data=wards)
    addtoDataBase(tablename="Beds", data=beds)
    addtoDataBase(tablename="EmergencyAlerts", data=emergencyalerts)
    addtoDataBase(tablename="DoctorLogin", data=doctorlogin)
    addtoDataBase(tablename="Appointments", data=appointments)
    addtoDataBase(tablename="LabInfos", data=labinfos)
    addtoDataBase(tablename="Ambulances", data=ambulances)
    addtoDataBase(tablename="OperationTheaters", data=operationtheaters)
    addtoDataBase(tablename="PatientHistory", data=patienthistory)


def addRandomDataToDB(num):
    createData(num)
    addData()

def buildHospitalMS():
    print("Creating Tables")
    db.createTables()
    db.createForiegnKeys()
    print("Tables created!")

    print("Adding Random Data to Database.")
    addRandomDataToDB(100)
    print("Data added!")
