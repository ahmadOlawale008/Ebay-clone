from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db.models import QuerySet
from django.core.validators import MinLengthValidator
from django.utils.translation import gettext_lazy as _


class AccountType(models.TextChoices):
    BUYER = "b", "Buyer"
    SELLER = "s", "Seller"
    BOTH = "bt", "Both"


class BusinessType(models.TextChoices):
    SOLE_PROPRIETORSHIP = "SP", "Proprietorship"
    CORPORATION = "C", "Corporation"
    PARTNERSHIP = "P", "Partnership"
    LIMITED_LIABILITY_COMPANY = "LLC", "Limited liability company"


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
            self, email, phoneNumber, password=None, **kwargs
    ):
        email = self.normalize_email(email)
        if not email:
            raise ValueError("Please provide a valid email")
        kwargs.setdefault("is_active", True)
        user = self.model(
            email=email,
            phoneNumber=phoneNumber,
            **kwargs,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
            self, email, phoneNumber, password=None, **kwargs
    ):
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("account_type", AccountType.BOTH)
        if kwargs.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if kwargs.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        user = self.create_user(email, phoneNumber, password, **kwargs)
        return user


class AuthUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True,
        help_text="If your account is of a business type i.e. seller, then please drop your business email instead",
    )
    phoneNumber = models.CharField(
        max_length=15,
        verbose_name=_("Phone number"),
        unique=True,
        help_text="Email. If your account is of a business type i.e. seller, please drop your business phone number instead",
    )
    account_type = models.CharField(
        max_length=2, choices=AccountType, default=AccountType.BUYER
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phoneNumber"]
    objects = AuthUserManager()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email


class PersonalBusinessInfo(models.Model):
    user = models.OneToOneField(
        AuthUser, on_delete=models.CASCADE, related_name="user_account"
    )
    first_name = models.CharField(
        max_length=30,
        verbose_name=_("First name"),
        default=user.name,
        help_text="If your account is of a business type i.e. seller, then please drop your business name instead",
        validators=[MinLengthValidator(2)],
    )
    last_name = models.CharField(
        max_length=30,
        blank=None,
        help_text="Not required for business account",
        verbose_name=_("Last name"),
        validators=[MinLengthValidator(2)],
    )

    class Meta:
        unique_together = [["first_name", "last_name"]]
        abstract = True


class PersonalInfo(PersonalBusinessInfo):
    date_of_birth = models.DateField(blank=True, null=True)
    address = models.CharField(max_length=150, blank=True, null=True)
    country = models.CharField(max_length=30)

    def save(self, *args, **kwargs):
        if not self.first_name:
            self.first_name = self.user.name
        return super().save(*args, **kwargs)


class BusinessInfo(PersonalBusinessInfo):
    business_name = models.CharField(
        unique=True,
        max_length=30,
        verbose_name=_("Business Name"),
        error_messages="Business Name already exists",
        validators=[MinLengthValidator(3)],
    )
    business_location = models.CharField(max_length=150)
    business_country = models.CharField(max_length=20)
    business_started_since = models.DateField(blank=True, null=True, help_text="(If Applicable)")
    business_type = models.CharField(max_length=3, choices=BusinessType, default=BusinessType.SOLE_PROPRIETORSHIP)
    business_description = models.CharField(max_length=300, blank=True)
    business_custom_care_phone_number = models.CharField(
        max_length=15,
        unique=True,
    )
    registration_number = models.CharField(max_length=50, blank=True, help_text="(If Applicable)", unique=True)
    tax_identification_number = models.CharField(max_length=50, blank=True, help_text="(If Applicable)", unique=True)
    website = models.URLField(blank=True, help_text="(If Applicable)", unique=True)
    business_social_A = models.URLField(blank=True, help_text="(If Applicable)")
    business_social_B = models.URLField(blank=True, help_text="(If Applicable)")
    business_social_C = models.URLField(blank=True, help_text="(If Applicable)")
    business_social_D = models.URLField(blank=True, help_text="(If Applicable)")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.first_name:
            self.first_name = self.user.name
        return super().save(*args, **kwargs)

    def get_business_name(self):
        return self.user.name

class BusinessFeedback(models.Model):
    pass
class BusinessFinancialInfo(models.Model):
    business = models.ForeignKey(BusinessInfo, related_name="business_info")
