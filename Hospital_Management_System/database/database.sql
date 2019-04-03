
/* creating tables all required tables */

CREATE TABLE Patients(
    patient_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    mobileNumber VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(1) NOT NULL,
    PRIMARY KEY ( patient_id )
);


CREATE TABLE PatientHistory(
    patient_id INT NOT NULL,
    fromdate DATE NOT NULL,
    todate DATE NOT NULL,
    disease TEXT NOT NULL,
    doctor_id INT NOT NULL,
    bed_id INT NOT NULL,
    report_id INT,
    prescription TEXT NOT NULL,
);


CREATE TABLE Doctors(
    doctor_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    mobileNumber VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    department_id INT NOT NULL,
    gender VARCHAR(1) NOT NULL,
    PRIMARY KEY ( doctor_id )
);

CREATE TABLE Wards(
    ward_number INT NOT NULL AUTO_INCREMENT,
    wardtype TEXT NOT NULL,
    PRIMARY KEY ( ward_number )
);


CREATE TABLE Beds(
    bed_id INT NOT NULL AUTO_INCREMENT,
    ward_number INT NOT NULL,
    bed_number INT NOT NULL,
    patient_id INT NULL,
    PRIMARY KEY ( bed_id )
);


CREATE TABLE EmergencyAlerts(
    alert_id INT NOT NULL AUTO_INCREMENT,
    timestamp DATETIME NOT NULL,
    message TEXT NOT NULL,
    doctor_id INT NOT NULL,
    PRIMARY KEY ( alert_id )
);

CREATE TABLE DoctorLogin(
    doctor_id INT NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Appointments(
    appointment_id INT NOT NULL AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    status ENUM("accepted", "rejected", "pending") NOT NULL,
    timestamp DATETIME NOT NULL,
    PRIMARY KEY ( appointment_id )
);

CREATE TABLE Departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    salary INT NOT NULL,
    PRIMARY KEY ( department_id )
);

CREATE TABLE LabInfos(
    report_id INT NOT NULL AUTO_INCREMENT,
    testresult TEXT NOT NULL,
    patient_id INT NOT NULL,
    PRIMARY KEY ( report_id )
);

CREATE TABLE Ambulances(
    ambulance_id INT NOT NULL AUTO_INCREMENT,
    platenumber VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status ENUM("available", "not available") NOT NULL,
    PRIMARY KEY ( ambulance_id )
);

CREATE TABLE OperationTheaters(
    opth_id INT NOT NULL AUTO_INCREMENT,
    fromdate DATETIME NOT NULL,
    todate DATETIME NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    PRIMARY KEY ( opth_id )
);


/* linking foriegn keys in all tables */

ALTER TABLE Doctors
    ADD FOREIGN KEY (department_id) REFERENCES Departments(department_id);

ALTER TABLE Beds
    ADD FOREIGN KEY (ward_number) REFERENCES Wards(ward_number);

ALTER TABLE DoctorLogin
    ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id);

ALTER TABLE Appointments
    ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
    ADD FOREIGN KEY (patient_id) REFERENCES Patients(patient_id);

ALTER TABLE OperationTheaters
    ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
    ADD FOREIGN KEY (patient_id) REFERENCES Patients(patient_id);

ALTER TABLE PatientHistory
    ADD FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id),
    ADD FOREIGN KEY (report_id) REFERENCES LabInfos(report_id),
    ADD FOREIGN KEY (bed_id) REFERENCES Beds(bed_id),
    ADD FOREIGN KEY (patient_id) REFERENCES Patients(patient_id);
