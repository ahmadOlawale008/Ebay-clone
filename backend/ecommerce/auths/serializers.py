from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import MinimumLengthValidator
import string
from django.core.validators import validate_email as django_validate_email
from django.utils.translation import gettext_lazy as _
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
    def validate(self, attrs):
        password = attrs.get("password", "")
        confirm_password = attrs.get("confirm_password", "")
        if confirm_password != password:
            return serializers.ValidationError({"confirm_password": "Ensure that both passwords are equal"})
        return super().validate(attrs)
    class Meta:
        model = get_user_model()
        fields = ["id", "first_name", "last_name", "email", "phoneNumber", "password"]
