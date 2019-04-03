import pymysql as sql
from Hospital_Management_System.helper.helper import *


@HospitalMS
def createTables(cursor):
    cursor.execute("""CREATE TABLE Patients(
        patient_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        mobileNumber VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(1) NOT NULL,
        PRIMARY KEY ( patient_id )
    );""")

    cursor.execute("""CREATE TABLE PatientHistory(
        patient_id INT NOT NULL,
        fromdate DATE NOT NULL,
        todate DATE NOT NULL,
        disease TEXT NOT NULL,
        doctor_id INT NOT NULL,
        bed_id INT NOT NULL,
        report_id INT,
        prescription TEXT NOT NULL
    );""")
    
    cursor.execute("""CREATE TABLE Doctors(
        doctor_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        mobileNumber VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        dob DATE NOT NULL,
        department_id INT NOT NULL,
        gender VARCHAR(1) NOT NULL,
        PRIMARY KEY ( doctor_id )
    );""")
    
    cursor.execute("""CREATE TABLE Wards(
        ward_number INT NOT NULL AUTO_INCREMENT,
        wardtype TEXT NOT NULL,
        PRIMARY KEY ( ward_number )
    );""")
    
    cursor.execute("""CREATE TABLE Beds(
        bed_id INT NOT NULL AUTO_INCREMENT,
        ward_number INT NOT NULL,
        patient_id INT NULL,
        bed_number INT NOT NULL,
        PRIMARY KEY ( bed_id )
    );""")
    
    cursor.execute("""CREATE TABLE EmergencyAlerts(
        alert_id INT NOT NULL AUTO_INCREMENT,
        timestamp DATETIME NOT NULL,
        doctor_id INT NOT NULL,
        message TEXT NOT NULL,
        PRIMARY KEY ( alert_id )
    );""")
    
    cursor.execute("""CREATE TABLE DoctorLogin(
        doctor_id INT NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
    );""")
    
    cursor.execute("""CREATE TABLE Appointments(
        appointment_id INT NOT NULL AUTO_INCREMENT,
        patient_id INT NOT NULL,
        doctor_id INT NOT NULL,
        status ENUM("accepted", "rejected", "pending") NOT NULL,
        timestamp DATETIME NOT NULL,
        PRIMARY KEY ( appointment_id )
    );""")
    
    cursor.execute("""CREATE TABLE Departments(
        department_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        salary INT NOT NULL,
        PRIMARY KEY ( department_id )
    );""")
    
    cursor.execute("""CREATE TABLE LabInfos(
        report_id INT NOT NULL AUTO_INCREMENT,
        patient_id INT NOT NULL,
        testresult TEXT NOT NULL,
        PRIMARY KEY ( report_id )
    );""")
    
    cursor.execute("""CREATE TABLE Ambulances(
        ambulance_id INT NOT NULL AUTO_INCREMENT,
        platenumber VARCHAR(12) NOT NULL,
        type VARCHAR(100) NOT NULL,
        status ENUM("available", "not available") NOT NULL,
        PRIMARY KEY ( ambulance_id )
    );""")
    
    cursor.execute("""CREATE TABLE OperationTheaters(
        opth_id INT NOT NULL AUTO_INCREMENT,
        fromdate DATETIME NOT NULL,
        todate DATETIME NOT NULL,
        patient_id INT NOT NULL,
        doctor_id INT NOT NULL,
        PRIMARY KEY ( opth_id )
    );""")
    
@HospitalMS
def createForiegnKeys(cursor):
    cursor.execute("""ALTER TABLE Doctors
        ADD FOREIGN KEY (department_id) REFERENCES Departments(department_id);""")


    cursor.execute("""ALTER TABLE EmergencyAlerts
        ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id);""")

    cursor.execute("""ALTER TABLE LabInfos
        ADD FOREIGN KEY (patient_id) REFERENCES Patients(patient_id);""")


    cursor.execute("""ALTER TABLE Beds
        ADD FOREIGN KEY (ward_number) REFERENCES Wards(ward_number),
        ADD FOREIGN KEY (patient_id) REFERENCES Patients(patient_id);""")

    cursor.execute("""ALTER TABLE DoctorLogin
        ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id);""")

    cursor.execute("""ALTER TABLE Appointments
        ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
        ADD FOREIGN KEY (patient_id) REFERENCES Patients(patient_id);""")

    cursor.execute("""ALTER TABLE OperationTheaters
        ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
        ADD FOREIGN KEY (patient_id) REFERENCES Patients(patient_id);""")

    cursor.execute("""ALTER TABLE PatientHistory
        ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
        ADD FOREIGN KEY (report_id) REFERENCES LabInfos(report_id),
        ADD FOREIGN KEY (bed_id) REFERENCES Beds(bed_id),
        ADD FOREIGN KEY (patient_id) REFERENCES Patients(patient_id);""")