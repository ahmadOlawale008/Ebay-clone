from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import MinimumLengthValidator
import string
from django.core.validators import validate_email as django_email_valid
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from .models import AccountType, Seller, Buyer, AuthUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
class EazeSalesTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["id"] = user.id
        token["email"] = user.email
        token["account_type"] = user.account_type
        try:
            if user.account_type == AccountType.BUYER:
                personal_info = Buyer.objects.get(user=user)
                token.update(
                    first_name=personal_info.first_name,
                    last_name=personal_info.last_name,
                    created=personal_info.created,
                )
            elif user.account_type == AccountType.SELLER:
                business_info = Seller.objects.get(user=user)
                token.update(
                    business_name=business_info.business_name,
                    first_name=business_info.first_name,
                    last_name=business_info.last_name,
                    created=business_info.created,
                )
        except (Buyer.DoesNotExist, Seller.DoesNotExist):
            pass
        return token
from django.core.validators import MinLengthValidator
UserModel = get_user_model()
# def check_validate_email(value):
#     try:
#         django_email_valid(value)
#     except Exception:
#         raise serializers.ValidationError("Invalid email address.")
#     if UserModel.objects.filter(email=value).exists():
#         raise serializers.ValidationError("Email Address Already in Use.")
#     return value
class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        max_length=30,
        required=True,
        help_text="If your account is of a business type i.e. seller, then please drop your business name instead",
        validators=[MinLengthValidator(2)],
    )
    last_name = serializers.CharField(
        max_length=30,
        required=True,
        help_text="If your account is of a business type i.e. seller, then please drop your business name instead",
        validators=[MinLengthValidator(2)],
    )
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    confirm_password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    class Meta:
        model = UserModel
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "account_type",
            "password",
            "confirm_password",
        ]
        extra_fields = {
            "read_only": [
                "id",
            ]
        }
    def validate(self, attrs):
        password = attrs.get("password")
        confirm_password = attrs.get("confirm_password")
        if confirm_password != password:
            raise serializers.ValidationError(
                {"confirm_password": _("Ensure that both passwords are equal")}
            )
        return attrs
    def validate_email(self, value):
        if UserModel.objects.filter(email=value).exists():
            raise serializers.ValidationError(_("Email Address Already in Use."))
        return value
    def validate_first_name(self, value):
        if len(value.strip()) == 0:
            raise serializers.ValidationError(_("Please provide your first name."))
        return value
    def validate_last_name(self, value):
        if len(value.strip()) == 0:
            raise serializers.ValidationError(_("Please provide your last name."))
        return value
    def validate_password(self, value):
        if not any(char in string.ascii_uppercase for char in value):
            raise serializers.ValidationError(_("Please ensure your password contains upper case for security reasons."))
        if not any(char in string.ascii_lowercase for char in value):
            raise serializers.ValidationError(_("Please ensure your password contains lower case for security reasons."))
        if not any(char in string.punctuation for char in value):
            raise serializers.ValidationError(_(f"Please ensure your password contains at least one punctuation of {string.punctuation}"))
        if len(value.strip()) < 8:
            raise serializers.ValidationError(
                _("Ensure your password has a minimum length of 8")
            )
        return value
    def validate_phoneNumber(self, value):
        if get_user_model().objects.filter(phoneNumber=value).exists():
            raise serializers.ValidationError(_("A user with this phone number already exists."))
        if value.strip() == "" or len(value.strip()) == 0:
            raise serializers.ValidationError(_("Please provide a valid phone number."))
        return value
    def create(self, validated_data):
        validated_data.pop("confirm_password")
        try:
            user = UserModel.objects.create(**validated_data, is_active=False)
            user.save()
        except:
            return serializers.ValidationError(_("Could not create user, please try again."))
        return user
