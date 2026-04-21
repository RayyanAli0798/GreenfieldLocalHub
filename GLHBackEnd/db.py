from fastapi import FastAPI
from pymongo import MongoClient

Client = MongoClient("mongodb+srv://rayyandiscord41_db_user:cdwoyEY5nyDegdYy@cluster0.tuis5gp.mongodb.net/?appName=Cluster0")
db = Client["Greenfield_Local_Health"]