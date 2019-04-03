import mysql.connector
from faker import Faker
import random
fake = Faker()


mydb = mysql.connector.connect(
    host="localhost",
    user="aakar",
    passwd="Aakar@123",
    database="airport"
)
mycursor = mydb.cursor()
count = 10

for i in range(count):
    try:
        name = fake.name()
        city = fake.city()
        country = fake.country()
        val = (name, city, country)
        sql = "INSERT INTO airport (name, city, country) VALUES (%s, %s, %s)"
        mycursor.execute(sql, val)
        mydb.commit()
    except Exception:
        print("Skipped airport")
        continue
sql = "select code from airport"
mycursor.execute(sql)
codes = mycursor.fetchall()

for j in range(count):
    try:
        val = (fake.name(), random.choice(codes)[0], random.choice(codes)[0])
        sql = "INSERT INTO flight (airline, from_airport_code, to_airport_code) VALUES (%s, %s, %s)"
        mycursor.execute(sql, val)
        val = (random.choice(codes)[0], fake.random_number(digits=3, fix_len=True), fake.date(
            pattern="%Y/%m/%d", end_datetime=None), fake.name())
        sql = "INSERT INTO reservation (flight_number, seat_number, date, passenger_name) VALUES (%s, %s, %s, %s)"
        mycursor.execute(sql, val)
        mydb.commit()
    except Exception:
        print("Skipped all" + str(j))
        continue