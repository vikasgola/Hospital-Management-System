import Hospital_Management_System.helper.helper as hel
import Hospital_Management_System.datagenerator.datagenerator as dbgen
import pymysql as sql
import getpass

dbname = "HospitalMS"

def createDatabase(username,password):
    connection = sql.connect(host='localhost', user=username, password=password)
    try:
        with connection.cursor() as cursor:
            cursor.execute("CREATE DATABASE {};".format(dbname))
        connection.commit()
    except:
        raise Exception("Failed to Create Database.")
    finally:
        connection.close()
    
def clear(username,password):
    connection = sql.connect(host='localhost', user=username, password=password)
    try:
        with connection.cursor() as cursor:
            cursor.execute("drop database {};".format(dbname))
        connection.commit()
    except:
        pass
    finally:
        connection.close()

def createUser(username,password):
    connection = sql.connect(host='localhost', user=username, password=password)
    try:
        with connection.cursor() as cursor:
            print("Set Admin Username and Password for {}.".format(dbname))
            _username = input("Username: ")
            _password = getpass.getpass("Password: ")
            while(_username == "" or _password == ""):
                print("Username or Password can't be set to Blank.")
                _username = input("Username: ")
                _password = getpass.getpass("Password: ")
            try:    
                cursor.execute("DROP USER '{}'@'localhost'".format(_username))
                cursor.execute("DROP USER '{}'@'localhost';".format("hmsuser"))
            except:
                cursor.execute("CREATE USER '{}'@'localhost' IDENTIFIED BY '{}';".format(_username, _password))
                cursor.execute("GRANT ALL PRIVILEGES ON {}.* To '{}'@'localhost' IDENTIFIED BY '{}';".format(dbname, _username, _password))
                cursor.execute("CREATE USER '{}'@'localhost' IDENTIFIED BY '{}';".format("hmsuser","hmsuserpassword"))
                cursor.execute("GRANT SELECT, INSERT, UPDATE ON {}.* To '{}'@'localhost' IDENTIFIED BY '{}';".format(dbname,"hmsuser", "hmsuserpassword"))
        connection.commit()
    except:
        raise Exception("Failed to Create User")
    finally:
        connection.close()


if __name__ == "__main__":
    print("")
    print("Hospital Management System (HospitalMS) need username and Password to create Database for it.")
    username = input("Username(mysql): ")
    password = getpass.getpass("Password(mysql): ")

    hel.setUsername(username)
    hel.setPassword(password)
    
    print("Creating Database.")
    try:
        createDatabase(username,password)
    except:
        clear(username,password)
        createDatabase(username,password)
    print("Database created.")

    print("Creating Admin User for HospitalMS.")
    createUser(username,password)
    print("Admin User for HospitalMS created.")


    # setup database
    dbgen.buildHospitalMS()