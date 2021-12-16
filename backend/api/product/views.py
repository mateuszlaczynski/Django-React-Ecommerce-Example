from django.http.response import JsonResponse
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import ProductSerializer
from .models import Product

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer
    lookup_field = 'slug'
