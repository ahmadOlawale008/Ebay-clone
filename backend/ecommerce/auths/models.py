from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.db.models import QuerySet
from django.core.validators import MinLengthValidator
from django.utils.translation import gettext_lazy as _
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.gis.geoip2 import GeoIP2


class AccountType(models.TextChoices):
    BUYER = "b", "Buyer"
    SELLER = "s", "Seller"
    BOTH = "bt", "Both"


class BusinessType(models.TextChoices):
    SOLE_PROPRIETORSHIP = "SP", "Proprietorship"
    CORPORATION = "C", "Corporation"
    PARTNERSHIP = "P", "Partnership"
    LIMITED_LIABILITY_COMPANY = "LLC", "Limited liability company"


class FeedBackRating(models.TextChoices):
    ONE = "1", "1"
    TWO = "2", "2"
    THREE = "3", "3"
    FOUR = "4", "4"
    FIVE = "5", "5"


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

    def create_user(self, email, phoneNumber, password=None, **kwargs):
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

    def create_superuser(self, email, phoneNumber, password=None, **kwargs):
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
        max_length=2, choices=AccountType.choices, default=AccountType.BUYER
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phoneNumber"]
    objects = AuthUserManager()
    created = models.DateTimeField(default=timezone.now, editable=False)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email


class BusinessAddress(models.Model):
    address = models.CharField(max_length=100)


class AbstractPersonalSeller(models.Model):
    first_name = models.CharField(
        max_length=30,
        verbose_name=_("First name"),
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
    google_id = models.CharField(max_length=256, unique=True, null=True)
    github_id = models.CharField(max_length=256, unique=True, null=True)
    twitter_id = models.CharField(max_length=256, unique=True, null=True)
    """
    By limiting the storage of customers' full date of birth and opting for storing only the year of birth, 
    organizations can enhance security, comply with regulations, and still derive valuable insights for business purposes. 
    """
    year_of_birth = models.PositiveIntegerField()
    profile_image = models.ImageField(
        upload_to="media/profile",
        default="user-svgrepo-com.svg",
        blank=True,
        null=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [["first_name", "last_name"]]
        abstract = True


class Buyer(AbstractPersonalSeller):
    user = models.OneToOneField(
        AuthUser, on_delete=models.CASCADE, related_name="personal_info"
    )
    middle_name = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.first_name:
            self.first_name = self.user.name
        return super().save(*args, **kwargs)

    class Meta:
        unique_together = [["first_name", "last_name", "middle_name"]]


class Address(models.Model):
    buyer = models.OneToOneField(Buyer, related_name="buyer_address")
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state_province_region = models.CharField(max_length=150)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, blank=True, null=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, blank=True, null=True
    )
    address_type = models.CharField(
        max_length=50,
        choices=(("billing", "Billing"), ("shipping", "Shipping")),
        blank=True,
        null=True,
    )


class Seller(AbstractPersonalSeller):
    user = models.OneToOneField(
        AuthUser, on_delete=models.CASCADE, related_name="business_info"
    )
    business_name = models.CharField(
        unique=True,
        max_length=30,
        verbose_name=_("Business Name"),
        error_messages="Business Name already exists",
        validators=[MinLengthValidator(3)],
    )
    business_started_since = models.DateField(
        blank=True, null=True, help_text="(If applicable)"
    )
    business_type = models.CharField(
        max_length=3,
        choices=BusinessType.choices,
        default=BusinessType.SOLE_PROPRIETORSHIP,
    )
    business_description = models.CharField(max_length=800, blank=True)
    business_custom_care_phone_number = models.CharField(
        max_length=15,
        unique=True,
    )
    registration_number = models.CharField(
        max_length=50, blank=True, help_text="(If applicable)", unique=True
    )
    tax_identification_number = models.CharField(
        max_length=50, blank=True, help_text="(If applicable)", unique=True
    )
    postal_code = models.CharField(max_length=10, default="")
    # region
    website = models.URLField(blank=True, help_text="(If applicable)", unique=True)
    business_social_A = models.URLField(blank=True, help_text="(If applicable)")
    business_social_B = models.URLField(blank=True, help_text="(If applicable)")
    business_social_C = models.URLField(blank=True, help_text="(If applicable)")
    business_social_D = models.URLField(blank=True, help_text="(If applicable)")
    business_confirmation = models.BooleanField(default=False)
    created_on = models.DateField(blank=True)

    def save(self, *args, **kwargs):
        if not self.first_name:
            self.first_name = self.user.name
        return super().save(*args, **kwargs)

    def get_business_name(self):
        return self.user.name


class BusinessAddress(models.Model):
    # user = models.ForeignKey(AuthUser, on_delete=models.CASCADE, related_name="address")
    business = models.ForeignKey(
        Seller, on_delete=models.CASCADE, related_name="business_address"
    )
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state_province_region = models.CharField(max_length=150)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, blank=True, null=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, blank=True, null=True
    )
    address_type = models.CharField(
        max_length=50,
        choices=(("billing", "Billing"), ("shipping", "Shipping")),
        blank=True,
        null=True,
    )


class BusinessFeedback(models.Model):
    business = models.ForeignKey(
        Seller, on_delete=models.CASCADE, related_name="business_feedback"
    )
    feedback_from = models.ManyToManyField(AuthUser, related_name="business_from")
    feedback_rating = models.CharField(
        max_length=1, choices=FeedBackRating.choices, blank=True
    )
    feedback_has_verified_purchase = models.BooleanField(default=False)
    feedback_comment = models.TextField()
    feedback_is_valid = models.BooleanField(default=True)

    def __str__(self):
        return (
            f"{self.feedback_comment[0:20]}...."
            if len(self.feedback_comment.strip()) > 20
            else self.feedback_comment
        )


# class BusinessFinancialInfo(models.Model):
#     business = models.ForeignKey(Seller, related_name="business_info", on_delete=models.CASCADE)
