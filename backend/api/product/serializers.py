from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)
    class Meta:
        model = Product
        fields = ("name", "description", "slug", "id", "price", "stock", "image", "category","amount")
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }