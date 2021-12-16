from django.db import models
from api.category.models import Category
from django.template.defaultfilters import slugify
from PIL import Image

class Product(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField(max_length=2500)
    image = models.ImageField(upload_to="images/")
    price = models.IntegerField()
    amount = models.IntegerField(default=0)
    stock = models.IntegerField()
    active = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(f"{self.name}")

        super(Product, self).save()
