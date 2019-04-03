import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="aakar",
  passwd="Aakar@123",
)
mycursor = mydb.cursor()
mycursor.execute("CREATE DATABASE nhl")
