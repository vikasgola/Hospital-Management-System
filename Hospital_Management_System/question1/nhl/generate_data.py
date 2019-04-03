import mysql.connector
from faker import Faker
import random
fake = Faker()


mydb = mysql.connector.connect(
    host="localhost",
    user="aakar",
    passwd="Aakar@123",
    database="nhl"
)
mycursor = mydb.cursor()
# count = 10

for i in range(5):
    try:
        name = fake.name()
        coach_name = fake.name()
        val = (name, coach_name)
        sql = "INSERT INTO team (name, coach_name) VALUES (%s, %s)"
        mycursor.execute(sql, val)
        mydb.commit()
    except Exception:
        print("Skipped team")
        continue

sql = "select id from team"
mycursor.execute(sql)
teams = mycursor.fetchall()

for i in range(20):
    try:
        val = (fake.name(), fake.name(), fake.random_number(digits=3, fix_len=True), random.choice(teams)[0])
        sql = "INSERT INTO player (name, position, skill_level, team_id) VALUES (%s, %s, %s, %s)"
        mycursor.execute(sql, val)
    except Exception:
        print("Skipped player")
        continue

for i in range(20):
    try:
        val = (fake.name(), fake.date(pattern="%Y/%m/%d", end_datetime=None))
        sql = "INSERT INTO injury (description, date) VALUES (%s, %s)"
        mycursor.execute(sql, val)
    except Exception:
        print("Skipped injury")
        continue

sql = "select id from player"
mycursor.execute(sql)
players = mycursor.fetchall()

sql = "select id from injury"
mycursor.execute(sql)
injuries = mycursor.fetchall()

for i in range(20):
    try:
        val = (random.choice(players)[0], random.choice(injuries)[0])
        sql = "INSERT INTO player_injury (player_id, injury_id) VALUES (%s, %s)"
        mycursor.execute(sql, val)
    except Exception:
        print("Skipped player_injury")
        continue

for i in range(10):
    try:
        val = (random.choice(teams)[0], random.choice(teams)[0], fake.date(pattern="%Y/%m/%d", end_datetime=None), fake.random_number(digits=2, fix_len=True), fake.random_number(digits=2, fix_len=True))
        sql = "INSERT INTO game (host_id, guest_id, date, host_score, guest_score) VALUES (%s, %s, %s, %s, %s)"
        mycursor.execute(sql, val)
        mydb.commit()
    except Exception:
        print("Skipped game")
        continue