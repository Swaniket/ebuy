from django.db import migrations
from api.user.models import CustomUser

# we need to create the superuser here because we have used custom user. 
# another way of doing the same is just go into the DB & run a SQL to create superuser
class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(
            name = 'swaniket', 
            email = 'swaniketchowdhury@gmail.com', 
            is_staff = True, 
            is_superuser = True,
            phone = '987654321',
            gender = 'Male'
            )
        user.set_password('12345')
        user.save()

    # if it's depended on the previous migrations then only we need to pass on any values or we leave it black  
    dependencies = [
    ]

    operations = [
        # we want to run the seed in order to migrate it into the db
        migrations.RunPython(seed_data),
    ]