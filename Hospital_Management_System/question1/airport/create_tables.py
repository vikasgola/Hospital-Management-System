import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="aakar",
  passwd="Aakar@123",
  database="airport"
)
mycursor = mydb.cursor()

mycursor.execute("CREATE TABLE airport (code integer primary key auto_increment, name VARCHAR(25) not null, city VARCHAR(25), country VARCHAR(25))")
mycursor.execute("CREATE TABLE flight (number integer primary key auto_increment, airline VARCHAR(25) not null, position VARCHAR(25), from_airport_code integer, to_airport_code integer, foreign key(from_airport_code) references airport(code), foreign key(to_airport_code) references airport(code))")
mycursor.execute("CREATE TABLE reservation (flight_number integer not null, seat_number VARCHAR(10) not null, date Date, passenger_name VARCHAR(25))")
