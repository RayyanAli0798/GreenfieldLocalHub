from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
from db import db
import uuid

# creating our route & database Collection
order_router = APIRouter() 
orders = db["orders"]

#basemodels
class Order(BaseModel):
    productName: str
    quantity: int
    cost: float
    product_ID: str
    userID: str
    producerID: str

#routes
@order_router.post("/sending_order")
def creating_order(orderData : Order):
    orderInformation = orderData.model_dump()
    finalOrderData = {
        "product_name": orderInformation["productName"],
        "quantity":orderInformation["quantity"],
        "total_cost":orderInformation["cost"],
        "producer_id":orderInformation["producerID"],
        "user_id":orderInformation["userID"],
        "product_id":orderInformation["product_ID"],
        "completed_status": False,
        "order_id": str(uuid.uuid4()) #giving the order a unique id
    }

    sendingOrder = orders.insert_one(finalOrderData)
    return "success"

@order_router.get("/getting_Orders")
def getting_orders():
    TotalOrders = list(orders.find())
    for eachOrder in TotalOrders:
        eachOrder["_id"] = str(eachOrder["_id"]) # making the objectID readable for frontend & backend

    return TotalOrders

@order_router.patch("/updating_status")
def updating_Completion(orderID: str):
    
    updatedStatus = {"completed_status": True}

    update = orders.update_one(
        {"order_id": orderID},
        {"$set": updatedStatus})
    
    return "success"
