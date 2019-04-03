import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="aakar",
  passwd="Aakar@123",
  database="nhl"
)
mycursor = mydb.cursor()

mycursor.execute("CREATE TABLE team (id integer primary key auto_increment, name VARCHAR(25) not null, coach_name VARCHAR(25), captain_id integer)")
mycursor.execute("CREATE TABLE player (id integer primary key auto_increment, name VARCHAR(25) not null, position VARCHAR(25), skill_level integer, team_id integer, foreign key(team_id) references team(id))")
mycursor.execute("CREATE TABLE injury (id integer primary key auto_increment, description VARCHAR(200) not null, date Date)")
mycursor.execute("CREATE TABLE player_injury (player_id integer, injury_id integer, foreign key(player_id) references player(id) ,foreign key(injury_id) references injury(id))")
mycursor.execute("CREATE TABLE game (host_id integer, guest_id integer, foreign key(host_id) references team(id) ,foreign key(guest_id) references team(id), date date, host_score int NOT NULL DEFAULT 0, guest_score int NOT NULL DEFAULT 0)")