from django.db import models


# Create your models here.
class CategoriesAbstract(models.Model):
    name = models.CharField(max_length=20, unique=True);

    class Meta:
        abstract = True

class ProductCategory(CategoriesAbstract):
    def __str__(self) -> str:
        return self.name


class SubCategory(CategoriesAbstract):
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL)
    def __str__(self) -> str:
        return self.name