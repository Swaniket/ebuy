from django.db import models
# The abstract user class is for customizing the provided login
from django.contrib.auth.models import AbstractUser

# Create your models here.
# by default, django logges you in by username & password, not by email
class CustomUser(AbstractUser):
    name = models.CharField(max_length=50, default = 'Anonymous')
    # I want every user to be unique in my platfrom by email
    email = models.EmailField(max_length=254, unique = True)

    # As username already exist
    username = None

    # This will allow us to sign users in based on the email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length=50, blank = True, null = True)
    gender = models.CharField(max_length=50, blank = True, null = True)

    # the default = 0 for easy checking that if it's 0, then the user is not logged in 
    session_token = models.CharField(max_length=50, default = 0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


