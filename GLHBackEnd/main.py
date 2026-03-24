from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from AccountRoute import accounts_router

app = FastAPI() 

app.add_middleware( 
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"], 
    allow_methods=["*"], 
    allow_headers=["*"], 
) 

app.include_router(
    accounts_router,
    prefix="/accounts",
    tags=["Account"],
)