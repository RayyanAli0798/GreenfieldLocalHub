from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from AccountRoute import accounts_router
from ProductRoute import products_router

app = FastAPI() 

app.add_middleware( 
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"], 
    allow_methods=["*"], 
    allow_headers=["*"], 
) 

app.include_router(
    accounts_router,
    prefix="/accounts",
    tags=["Account"],
)
app.include_router(
    products_router,
    prefix="/products",
    tags=["Product"],
)