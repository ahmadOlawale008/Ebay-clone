from django.db import models
import uuid 
# from utils.get_uuid import get_uuid4
# Create your models here.


# class ProductAttribute(models.Model):
#     key = models.CharField(max_length=150)
#     value = models.CharField(max_length=100)
    
#     def __str__(self):
#         return self.name
# class ProductVisibleTo(models.TextChoices):
#     ALL = 'ALL', 'All'
#     FOLLOWERS = 'FOLLOWERS', 'FOLLOWERS'
#     MYSELF = 'MYSELF', 'MYSELF'
    
# class Product(models.Model):
#     id = models.UUIDField(default=get_uuid4(), unique=True, primary_key=True, editable=False)
#     name = models.CharField(max_length=300)
#     description = models.TextField()
#     short_description = models.CharField(max_length=400)
#     quantity = models.PositiveIntegerField()
#     visible_to = models.CharField(choices=ProductVisibleTo.choices, default=ProductVisibleTo.ALL, max_length=20)   
#     products = models.ManyToManyField(ProductAttribute, related_name="attriutes")
#     product_website = models.URLField(blank=True, null=True)
    