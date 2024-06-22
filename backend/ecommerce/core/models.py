from django.db import models


# Create your models here.
class Categories(models.Model):
    name = models.CharField(max_length=12)


class CategoryProduct(models.Model):
    pass


class Products():
    pass
