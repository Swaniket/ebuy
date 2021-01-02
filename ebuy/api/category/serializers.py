from rest_framework import serializers
# We need to import the models as well because it's the file on which we are going to perform the serialization
from .models import Category

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    # Specifying the models & fields that needs to be serialized
    class Meta:
        # Defining our model
        model = Category
        # Specify the fields that needs to be serialized, not all the fields needs to be serialized
        fields = ('name', 'description')
