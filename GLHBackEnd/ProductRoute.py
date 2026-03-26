from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
from db import db
import uuid

products_router = APIRouter()
products = db["products"]

class product(BaseModel):
    product_name: str
    quantity_avaliable: int
    cost_per_unit: float
    producers_ID: str
    orderType: Literal["Both", "DeliveryOnly","CollectionOnly"]


@products_router.post("/adding_product")
def adding_products(productDetails: product):
    productInformation = productDetails.model_dump()

    final_product_information = {
        "product_name": productInformation["product_name"],
        "quantity_avaliable": productInformation["quantity_avaliable"],
        "cost_per_unit": productInformation["cost_per_unit"],
        "order_type": productInformation["orderType"],
        "is_listed": False,
        "producers_ID": productInformation["producers_ID"],
        "product_ID": str(uuid.uuid4())
    }
    products.insert_one(final_product_information)
    return "success"

@products_router.get("/getting_products")
def getting_products():
    
    products_list = list(products.find())
