from rest_framework import serializers
# It brings your password in clear text format & hashes it out
from django.contrib.auth.hashers import make_password
# decorators- It allow to add functionality in the prewritten code 
from rest_framework.decorators import authentication_classes, permission_classes
from .models import CustomUser

class UserSerializer(serializers.HyperlinkedModelSerializer):
    # for creating new users
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # it's gonna be intracting with the model & we will be saving it based on it
        # as the password is not in the model, we will be adding it here
        instance = self.Meta.model(**validated_data)

        # save it to the database when it's not empty
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

    # allow users to update existing fields
    def update(self, instance, validated_data):
        # as the validated data is a key. value pair
        for attr, value in validated_data.items():
            # for updating the password
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)

        instance.save()
        return instance

    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {'write_only': True}}
        # previously the fields were from the model itself, but now we are inheriting a class in our model
        fields = ('name', 'email', 'password', 'phone', 'gender', 'is_active', 'is_staff', 'is_superuser')