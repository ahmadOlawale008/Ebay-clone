from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db.models import QuerySet
from django.core.validators import MinLengthValidator
from django.utils.translation import gettext_lazy as _

class AuthUserQueryset(QuerySet):
    # make sure to use raw
    def get_admins(self):
        return self.filter(is_superuser=True)

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
        user = self.model(
            first_name=first_name.strip(),
            last_name = last_name.strip(),
            email=email,
            phoneNumber=phoneNumber,
            **kwargs,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, first_name, last_name, email, phoneNumber, password=None, **kwargs
    ):
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_staff", True)

        if kwargs.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if kwargs.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        user = self.create_user(first_name, last_name, email, phoneNumber, password, **kwargs)
        return user


class AuthUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(
        max_length=30, verbose_name=_("First name"), validators=[MinLengthValidator(2)]
    )
    last_name = models.CharField(
        max_length=30, verbose_name=_("Last name"), validators=[MinLengthValidator(2)]
    )
    email = models.EmailField(unique=True)
    phoneNumber = models.CharField(
        max_length=15,
        verbose_name=_("Phone number"),
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
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phoneNumber"]
    objects = AuthUserManager()

    class Meta:
        verbose_name_plural = "Users"
        unique_together = [["first_name", "last_name"]]

    def __str__(self):
        return self.email
