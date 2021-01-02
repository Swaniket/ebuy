from django.db import models
# Every porduct will be linked with some category, so we need to access the category
from api.category.models import Category

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 250)
    price = models.CharField(max_length = 50)
    stock = models.CharField(max_length = 50)
    # The default value will be true, & this property can be empty as well
    is_active = models.BooleanField(default = True, blank = True)
    # where the image should get uploaded to- It will find that the media is stored at 'media' folder from settings.py file
    # It will create a new folder in the media folder, and store the images there
    image = models.ImageField(upload_to='images/', blank = True, null = True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # To link the products to the category, we will do it via a foreign key
    # arguments: From where are we getting the key
    category = models.ForeignKey(Category, on_delete = models.SET_NULL, blank = True, null = True)

    # for proper names in the admin & backend
    def __str__(self):
        return self.name

    

