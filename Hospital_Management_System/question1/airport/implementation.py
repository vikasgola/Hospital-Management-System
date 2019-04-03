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

mycursor.execute("Select number from flight where from_airport_code = (Select code from airport where country = 'India')")
print(mycursor.fetchall())


mycursor.execute("Select passenger_name from reservation where date = '2019-02-11' and flight_number = 5")
print(mycursor.fetchall())


mycursor.execute("Select * from flight where airline = 'Air India' or airline = 'Indigo'")
print(mycursor.fetchall())