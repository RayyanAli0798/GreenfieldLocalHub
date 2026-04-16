from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
from db import db
from security import hash_password, Verify_password
import uuid

# creating our route & database Collection
accounts_router = APIRouter()
users = db["users"]

# Basemodels 
class Login(BaseModel):
    email: str
    password: str

class Register(BaseModel):
    email: str
    password: str
    confirm_password: str
    role: Literal["Consumer", "Producer"]

class UpdateUser(BaseModel):
    email:str
    password:str
    user_ID:str

# validation functions
def upper_case_check(password):
    #Validates the password has atleast 1 Upper case to ensure security
    for char in password:
        if char.isupper():
            return True
    return False
    
def lower_case_check(password):
    for char in password:
        if char.islower():
            return True
    return False
    
def digit_check(password):
    for char in password:
        if char.isdigit():
            return True
    return False
    
#routes
@accounts_router.post("/creating_account")
def creating_account(regiserData: Register):
    userData = regiserData.model_dump() # organising data in a dictionary
    claimedUser = users.find_one({"email": userData["email"]}) 

    #validating the users details
    if claimedUser: 
        raise HTTPException(status_code=409, detail="Email has already signed up.")
    elif 5 > len(userData["password"]) <25:
        raise HTTPException(status_code=400, detail="Password Length invalid")
    elif userData["password"] != userData["confirm_password"]:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    elif upper_case_check(userData["password"]) == False:
        raise HTTPException(status_code=400, detail="Password must contain atleast 1 Upper case")
    elif lower_case_check(userData["password"]) == False:
        raise HTTPException(status_code=400, detail="Password must contain atleast 1 Lower case")
    elif digit_check(userData["password"]) == False:
        raise HTTPException(status_code=400, detail="Password must contain atleast 1 Number")

    #does this if any issue is not detected
    else:
        
        hashedPassword = hash_password(userData["password"])
        userDetails = {
            "email" : userData["email"],
            "password" : hashedPassword,
            "role" : userData["role"],
            "user_ID": str(uuid.uuid4())
        }

        users.insert_one(userDetails)
        return userDetails["user_ID"]


@accounts_router.post("/login")
def sign_in(loginData: Login):
    userData = loginData.model_dump()
    userDetails = users.find_one({"email": userData["email"]}) #validates whether or not a user is in DB

    if not userDetails:
        raise HTTPException(status_code=404, detail="Email not found")

    if not Verify_password(userData["password"], userDetails["password"]): #ensures correct password is used
        raise HTTPException(status_code=401, detail="Incorrect Password")

    else:
        return {"role": userDetails["role"], "user_ID": userDetails["user_ID"]}


@accounts_router.delete("/delete_account") 
def deletingAccount(userID: str):
    delete = users.delete_one({"user_ID": userID})
    return  "success"

@accounts_router.patch("/updating_Details")
def updating_user(updateDetails: UpdateUser):
    updatedData = updateDetails.model_dump( exclude_unset=True)

    if "password" in updatedData and updatedData["password"]: #validates password if updated
        password = updatedData["password"]
        if upper_case_check(password) == False:
            raise HTTPException(status_code=400, detail="Password must contain atleast 1 Upper case")
        elif lower_case_check(password) == False:
            raise HTTPException(status_code=400, detail="Password must contain atleast 1 Lower case")
        elif digit_check(password) == False:
            raise HTTPException(status_code=400, detail="Password must contain atleast 1 Number")
        updatedData["password"] = hash_password(password)

    cleanedValues = {k:v for k,v in updatedData.items() if v is not None and v != ""} #removes empty fields
    update = users.update_one(
        {"user_ID": cleanedValues["userID"] },
        {"$set": cleanedValues})
    return "success"