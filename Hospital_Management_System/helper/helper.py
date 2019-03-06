import pymysql as sql
import getpass

username = None
password = None
dbname = "HospitalMS"

def HospitalMS(func):
    def inner(*args, **kwargs):
        connection = sql.connect(host='localhost', user=username, password=password, database=dbname)
        try:
            with connection.cursor() as cursor:
                out = func(*args, **kwargs, cursor=cursor)
            connection.commit()
        finally:
            connection.close()
        return out
    return inner

def setUsername(_username):
    global username
    username = _username

def setPassword(_password):
    global password
    password = _password

def getUsername():
    global username
    return username

def getPassword():
    global password
    return password