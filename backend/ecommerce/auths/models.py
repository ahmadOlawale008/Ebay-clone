from typing import Any
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models import BaseManager, QuerySet, Manager
from django.core.validators import MinLengthValidator


class AuthUserQueryset(QuerySet):
    # make sure to use raw
    def get_admins(self):
        return self.filter(is_admin=True)

    def get_staffs(self):
        # make sure to use raw
        return self.filter(is_staff=True)



class AuthUserManager(BaseUserManager):
    def get_queryset(self) -> QuerySet:
        return AuthUserQueryset(model=self.model, using=self._db)

    def create_user(
        self, first_name, last_name, email, phoneNumber, password=None, **kwargs
    ):
        email = self.normalize_email(email)
        if not email:
            raise ValueError("Please provide a valid email")
        kwargs.setdefault("is_active", True)
        kwargs.setdefault("is_staff", True)

        user = self.model(
            first_name.strip(),
            last_name.strip(),
            email,
            phoneNumber,
            password,
            **kwargs,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, first_name, last_name, email, phoneNumber, password=None, **kwargs
    ):
        kwargs.setdefault("is_admin", True)
        user = self.create_user(
            self, first_name, last_name, email, phoneNumber, password=None, **kwargs
        )
        user.save(using=self._db)
        return user


class AuthUser(AbstractBaseUser):
    # class Usertype(models.TextChoices):
    #     seller = "SELLER"
    #     buyer = "BUYER"
    first_name = models.CharField(
        max_length=30, verbose_name="First name", validators=[MinLengthValidator(2)]
    )
    last_name = models.CharField(
        max_length=30, verbose_name="First name", validators=[MinLengthValidator(2)]
    )
    email = models.EmailField(unique=True)
    phoneNumber = models.CharField(
        max_length=15,
        verbose_name="Phone number",
        unique=True,
    )
    user_type = models.CharField(
        choices=[
            ("buyer", "BUYER"),
            ("seller", "SELLER"),
            ("both", "BOTH"),
        ],
        max_length=6,
        default="buyer",
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "email", "phoneNumber"]
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    objects = AuthUserManager()

    class Meta:
        verbose_plural = "Users"
        unique_together = [["first_name", "last_name"]]

    def __str__(self):
        return self.email
