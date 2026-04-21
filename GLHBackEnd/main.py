from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from AccountRoute import accounts_router
from ProductRoute import products_router
from OrderRoute import order_router

app = FastAPI() 

#this will make it ONLY this port can access or send data to the backend
app.add_middleware( 
    CORSMiddleware, 
    allow_origins=["https://greenfieldlocalhub-hn5p.onrender.com/"], 
    allow_methods=["*"], 
    allow_headers=["*"], 
) 

# the below 3 sections include our files on the main api router (so they can be accessed)

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

app.include_router(
    order_router,
    prefix="/orders",
    tags=["Order"],
)

