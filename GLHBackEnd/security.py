from passlib.context import CryptContext

#using argon 2 as our hashing algorithm
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated = "auto"
)


def hash_password(password: str) -> str:
    # This function hashes a password, will be used during registration
    return pwd_context.hash(password)


def Verify_password(password: str, hashed_password:str) -> bool:
    # Since hashing is one way, we need to has another password and compare, this is done here.
    return pwd_context.verify(password, hashed_password)