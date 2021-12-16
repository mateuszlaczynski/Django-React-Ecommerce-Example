from django.db import models
from django.utils import translation
from api.user.models import CustomUser
from api.product.models import Product
from django.core.validators import RegexValidator

class Order(models.Model):
    user = models.CharField(max_length=50)
    adress = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=6)
    phone = models.CharField(primary_key=True, max_length=9, validators=[RegexValidator(r'^\d{9}$/')])
    name = models.CharField(max_length=25)
    surname = models.CharField(max_length=50)
    product_names = models.CharField(max_length=5000)
    transaction_id = models.CharField(max_length=150, default=0)
    total_amount = models.CharField(max_length=50, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} : {self.transaction_id}"