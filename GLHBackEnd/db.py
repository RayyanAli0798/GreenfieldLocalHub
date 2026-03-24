from fastapi import FastAPI
from pymongo import MongoClient

Client = MongoClient("mongodb://localhost:27017/")
db = Client["Greenfield_Local_Health"]