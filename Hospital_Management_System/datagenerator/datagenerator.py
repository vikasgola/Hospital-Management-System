import Hospital_Management_System.database.database as db
from Hospital_Management_System.helper.helper import *
import random,copy, datetime
from mimesis import Person, Business, Text, Numbers, Datetime, Code
import mimesis as dgen


def buildHospitalMS():

    print("Creating Tables")
    db.createTables()
    db.createForiegnKeys()
    print("Tables created!")

    print("Adding Random Data to Database.")
    # addRandomDataToDB(200)
    print("Data added!")
