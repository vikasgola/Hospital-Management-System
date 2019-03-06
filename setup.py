from setuptools import setup
from codecs import open
from os import path
import subprocess
from setuptools.command.test import test

setup(name='Hospital Management System',
    version='0.1.0',
    description='Hospital management system for IIT Jammu',
    author='Vikas Gola',
    author_email='vikasgola2015@gmail.com',
    python_requires = '>=3.6',
    packages=['Hospital_Management_System', 'Hospital_Management_System/helper','Hospital_Management_System/gui','Hospital_Management_System/database', 'Hospital_Management_System/datagenerator'],
    scripts = ["Hospital_Management_System/scripts/HospitalMSsetup", "Hospital_Management_System/scripts/HospitalMS" ],
    install_requires = ["pymysql==0.9.3", "pandas==0.24.1", "mimesis==3.0.0"]
)