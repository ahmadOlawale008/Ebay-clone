from rest_framework import serializers, status
from django.contrib.auth import get_user_model
import string
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from rest_framework.request import Request
from rest_framework.response import Response
from .models import AccountType, Seller, Buyer, AuthUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt import exceptions
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from django.conf import settings
from django.middleware import csrf
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import AuthenticationFailed


def get_user_token(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

class CookieObtainTokenPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            # pass
            email = request.data.get("email")
            password = request.data.get("password")
            user = authenticate(email=email, password=password)
            request.user = user
        return response
    def finalize_response(self, request, response, *args, **kwargs):
        refresh_token = response.data.get("refresh") or None
        if response.status_code == 200 and request.user:
            user = request.user
            if user is not None:
                if user.is_active:
                    response.set_cookie(
                        key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                        value=response.data["access"],
                        expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                        secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                        httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                        samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                    )
                    response.set_cookie(
                        key="refresh",
                        value=response.data["refresh"],
                        expires=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                        secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                        httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                        samesite="Strict",
                    )
                    csrf.get_token(request)
                    response.status_code = 200
                    print(response.data, "Token Response")
                    del response.data['refresh']
                else:
                    return Response(
                        {
                            "Authentication_status": "Failed",
                            "error": "Your account has been suspended.",
                        },
                        status=status.HTTP_401_UNAUTHORIZED,
                    )
            else:
                return Response(
                    {
                        "Authentication_status": "Failed",
                        "error": "Invalid email or password",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
        return super().finalize_response(request, response, *args, **kwargs)


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    # Refresh is None since its serializer.charfield by default.
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES["refresh"]
        if attrs["refresh"]:
            return super().validate(attrs)
        raise exceptions.InvalidToken("Invalid refresh token provided.", 404)


class CookieTokenRefreshSerializer(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        refresh_token = response.data.get("refresh")
        if refresh_token:
            response.set_cookie("refresh", refresh_token)
        return super().finalize_response(request, response, *args, **kwargs)

    serializer_class = CustomTokenRefreshSerializer


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
        "DUPLICATE_ENTRY": 'Your email address is already registered with eazeSales. Need help with your password? <a class="font-bold text-sm underline underline-offset-2 !text-blue-700" target="_blank" title="Password Assistance. The link opens in a new window or tab." href="/login">Click here</a>.',
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
            raise serializers.ValidationError(
                _(VALIDATION_MESSAGES["EMAIL"]["DUPLICATE_ENTRY"])
            )
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
