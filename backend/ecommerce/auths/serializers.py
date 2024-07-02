from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import MinimumLengthValidator
import string
from django.core.validators import validate_email as django_validate_email
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from .models import AccountType, Seller, Buyer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from django import forms


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


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        max_length=30,
        help_text="If your account is of a business type i.e. seller, then please drop your business name instead",
        validators=[
            MinLengthValidator(2),
        ],
    )
    last_name = serializers.CharField(
        max_length=30,
        help_text="If your account is of a business type i.e. seller, then please drop your business name instead",
        validators=[MinLengthValidator(2)],
    )
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    confirm_password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = get_user_model()
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
        extra_kwargs = {
            "read_only": [
                "id",
            ]
        }

    def validate(self, attrs):
        print("--------------------------->>> >>")
        print(attrs)
        print("--------------------------->>>>>")

        password = attrs.get("password", "")
        confirm_password = attrs.get("confirm_password", "")
        if confirm_password != password:
            raise serializers.ValidationError(
                {"confirm_password": "Ensure that both passwords are equal"}
            )
        return super().validate(attrs)

    def validate_password(self, value):
        if value:
            return serializers.ValidationError({"password": value})
        if not any(char in string.ascii_uppercase for char in value):
            raise serializers.ValidationError(
                {
                    "password": _(
                        "Please ensure your password contains upper case for security reasons."
                    )
                }
            )
        if not any(char in string.ascii_lowercase for char in value):
            raise serializers.ValidationError(
                {
                    "password": _(
                        "Please ensure your password contains lower case for security reasons."
                    )
                }
            )
        if not any(char in string.punctuation for char in value):
            raise serializers.ValidationError(
                {
                    "password": _(
                        f"Please ensure your password contains atleast one punctuation of {string.punctuation}"
                    )
                }
            )
        if len(value.strip()) < 8:
            raise serializers.ValidationError(
                {"message": _("Ensure your password has a minimum length of 8")}
            )
        return value

    def validate_first_name(self, value):
        if value.strip() == "" or len(value.strip()) == 0:
            raise serializers.ValidationError(
                {"first_name": "Please provide your first name."}
            )
        return value

    def validate_last_name(self, value):
        if value.strip() == "" or len(value.strip()) == 0:
            raise serializers.ValidationError(
                {"last_name": "Please provide your last name."}
            )
        return value

    def validate_phone_number(self, value):
        if get_user_model().objects.filter(phone_number=value).exists():
            raise serializers.ValidationError(
                {"phone_number": "A user with this username already exists."}
            )
        if value.strip() == "" or len(value.strip()) == 0:
            raise serializers.ValidationError(
                {"phone_number": "Please provide a valid phone number."}
            )
        return value
