from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import MinimumLengthValidator
import string
from django.core.validators import validate_email as django_validate_email
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
class EazeSalesTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['account_type'] = user.account_type
        return token
class UserSerializer(serializers.ModelSerializer):
    def validate_password(value):
        if not any(char in string.ascii_uppercase for char in value):
            return serializers.ValidationError(
                {
                    "password": _("Please ensure your password contains upper case for security reasons.")
                }
            )
        if not any(char in string.ascii_lowercase for char in value):
            return serializers.ValidationError(
                {
                    "password": _("Please ensure your password contains lower case for security reasons.")
                }
            )
        if not any(char in string.punctuation for char in value):
            return serializers.ValidationError(
                {
                    "password": _(
                        f"Please ensure your password contains atleast one punctuation of {string.punctuation}"
                    )
                }
            )
        if len(value.strip) < 8:
            return serializers.ValidationError(
                {"message": _("Ensure your password has a minimum length of 8")}
            )
            
    def validate_email(value):
        try:
            django_validate_email(value)
        except:
            return serializers.ValidationError({"message": "Invalid email format."})
        if get_user_model().objects.filter(email__exact=value).exists():
            return serializers.ValidationError(
                {"email": "Email Address Already in Use."}
            )
    password = serializers.CharField()
    confirm_password = serializers.CharField()
    def validate_first_name(self, value):
        if value.strip() == '' or  len(value.strip()) == 0:
            return serializers.ValidationError({"first_name": "Please provide your first name."})
    def validate_last_name(self, value):
        if value.strip() == '' or len(value.strip()) == 0:
            return serializers.ValidationError({"last_name": "Please provide your last name."})
    def validate_phone_number(self, value):
        if get_user_model().objects.filter(phone_number=value).exists():
            return serializers.ValidationError({"phone_number": "A user with this username already exists."})
        if value.strip() == '' or len(value.strip()) == 0:
            return serializers.ValidationError({"phone_number": "Please provide a valid phone number."})
    def validate(self, attrs):
        password = attrs.get("password", "")
        confirm_password = attrs.get("confirm_password", "")
        if confirm_password != password:
            return serializers.ValidationError({"confirm_password": "Ensure that both passwords are equal"})
        return super().validate(attrs)
    class Meta:
        model = get_user_model()
        fields = ["id", "first_name", "last_name", "email", "phoneNumber", "password"]
        extra_fields = {"read_only": ["id", ]}
