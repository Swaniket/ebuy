from rest_framework import serializers
# The data in which we are going to apply serialization
from .models import Product

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    # In django, the imagefield doesn't give you a full URL
    # for a entire URL for my images
    image = serializers.ImageField(
        max_length = None, allow_empty_file = False, allow_null = True, required = False)

    class Meta:
        # the model that is going to be serialized
        model = Product
        fields = ('id', 'name', 'description', 'price', 'image', 'category')  