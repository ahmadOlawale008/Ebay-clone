from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import MinimumLengthValidator
import string
from django.core.validators import validate_email as django_email_valid
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from rest_framework.request import Request
from rest_framework.response import Response
from .models import AccountType, Seller, Buyer, AuthUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from django.conf import settings

class CookieObtainTokenPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        refresh_token = response.data.get("refresh") or None
        if refresh_token is not None:
            response.set_cookie(
                key="refresh",
                value=refresh_token,
                expires=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True
            )
            del response.data["refresh"]
        return super().finalize_response(request, response, *args, **kwargs)

class CustomSerializer(serializers.ModelSerializer):
    pass
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        try:
            pass
        except:
            print('An exception occurred')
        return super().post(request, *args, **kwargs)


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

VALIDATION_MESSAGES = {
    "NAME": {
        "DUPLICATE_ENTRY": "A user with this name already exists.",
        "EMPTY_VALUE": "Please enter a value for this field.",
    },
    "EMAIL": {
        "INVALID_EMAIL": "Invalid email address.",
        "DUPLICATE_ENTRY": 'Your email address is already registered with eazeSales. Need help with your password? <a class="font-bold  underline underline-offset-2 !text-blue-700" target="_blank" title="Password Assistance. The link opens in a new window or tab." href="/login">Click here</a>.',
        "INVALID_DOMAIN": "Invalid email domain.",
        "BLOCKED_DOMAIN": "Email domain is not allowed.",
    },
    "PHONE_NUMBER": {
        "INVALID_PHONE_NUMBER": "Invalid phone number.",
        "DUPLICATE_ENTRY": "A user with this phone number already exists.",
    },
    "PASSWORD": {
        # code for password must include alphanumeric letters for security purposes.
        "ALPHANUMERIC_NEEDED": "ALPHANUMERIC_NEEDED",
        #   code for 'Password must have minimum length of 6.'
        "MAXLENGTH_OF_SIX": "MAXLENGTH_OF_SIX",
        # SPECIAL_CHARS_NEEDED Password must contain atleast one special characters {string.punctuation}
        "SPECIAL_CHARS_NEEDED": "SPECIAL_CHARS_NEEDED",
    },
    "INVALID": "Error signing up form. Please try again later.",
}

UserModel = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        max_length=30,
        write_only=True,
        required=True,
        help_text="If your account is of a business type i.e. seller, then please drop your business name instead",
    )
    last_name = serializers.CharField(
        write_only=True,
        max_length=30,
        required=True,
        help_text="If your account is of a business type i.e. seller, then please drop your business name instead",
    )
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = UserModel
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
        ]
        extra_fields = {
            "id": {"readonly": True}
        }

    def validate_email(self, value):
        if UserModel.objects.filter(email=value).exists():
            raise serializers.ValidationError(_("Email Address Already in Use."))
        return value

    def validate_first_name(self, value):
        if len(value.strip()) == 0:
            raise serializers.ValidationError(
                VALIDATION_MESSAGES["NAME"]["EMPTY_VALUE"]
            )
        return value

    def validate_last_name(self, value):
        if len(value.strip()) == 0:
            raise serializers.ValidationError(
                VALIDATION_MESSAGES["NAME"]["EMPTY_VALUE"]
            )
        return value

    def validate_password(self, value):
        if not any(char in string.ascii_uppercase for char in value):
            raise serializers.ValidationError(_("ALPHANUMERIC_NEEDED"))
        if not any(char in string.ascii_lowercase for char in value):
            raise serializers.ValidationError(_("ALPHANUMERIC_NEEDED"))

        # SPECIAL_CHARS_NEEDED Password must contain atleast one special characters {string.punctuation}
        if not any(char in string.punctuation for char in value):
            raise serializers.ValidationError(_("SPECIAL_CHARS_NEEDED"))
        #   code for 'Password must have minimum length of 6.'
        if len(value.strip()) < 6:
            raise serializers.ValidationError(_("MAXLENGTH_OF_SIX"))
        return value

    def create(self, validated_data):
        first_name = validated_data.get("first_name", None)
        last_name = validated_data.get("last_name", None)
        email = validated_data.get("email", None)
        password = validated_data.get("password", None)
        try:
            user = UserModel.objects.create(email=email, is_active=False)
            user.set_password(password)
            user.save()
        except:
            return serializers.ValidationError(
                _(VALIDATION_MESSAGES["INVALID"])
            )
        return user
