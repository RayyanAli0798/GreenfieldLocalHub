from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
from db import db
import uuid

# creating our route & database Collection
products_router = APIRouter()
products = db["products"]

#basemodels
class product(BaseModel):
    product_name: str
    quantity_avaliable: int
    cost_per_unit: float
    producers_ID: str
    orderType: Literal["Both", "DeliveryOnly","CollectionOnly"]

class update(BaseModel):
    productID: str
    quantity_avaliable: int
    cost_per_unit: float
    orderType: Literal["Both", "DeliveryOnly","CollectionOnly"]

#routes
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
    for product in products_list:
        product["_id"] = str(product["_id"]) # making object ID readable
    return products_list

@products_router.delete("/deleting_product")
def deletingAccount(productID: str):
    delete = products.delete_one({"product_ID": productID})
    return  "success"

@products_router.patch("/publishing_product")
def listing_product(productID: str):
    updateData =  {"is_listed": True} #making it viewable for any user
    update = products.update_one(
        {"product_ID": productID}, 
        {"$set": updateData}
    )
    return "success"
@products_router.patch("/updating_product_details")
def updating_detail(updateProduct : update):
    updatingDetails = updateProduct.model_dump() 
    update = products.update_one(
        {"product_ID": updatingDetails["productID"]},
        {"$set": updatingDetails}
    )
    return "success"
