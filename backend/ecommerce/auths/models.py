from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models import BaseManager, QuerySet, Manager
from django.core.validators import RegexValidator
class AuthUserQueries(QuerySet):
    pass
class AuthUserManager(Manager):
    pass
class AuthUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    phoneNumber = models.PositiveIntegerField()
    
class UserPerformance(models.Model):
    pass