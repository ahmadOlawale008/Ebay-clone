from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AuthUser, Buyer, Seller, BusinessFeedback
def listFilter():
    pass
class AuthUserAdmin(UserAdmin):
    model = AuthUser
    fieldsets = [
        ("Personal Info", {"fields": ["email", "phone_number", "password"]}),
        ("Account Type", {"fields": ["account_type"]}),
        (
            "Status",
            {
                "fields": [
                    "is_staff",
                    "is_superuser",
                    "is_active",
                    "verified_email",
                    "verified_phone_number",
                ]
            },
        ),
        ("Last Login", {"fields": ["last_login"]}),
    ]
    list_display = ["email", "phone_number", "is_staff", "is_superuser", "last_login"]
    search_fields = ["email", "phone_number", "account_type"]
    ordering = ["last_login"]
    @admin.display(description="Name")
    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name.lower()}".capitalize()

# Register your models here.
admin.site.register(AuthUser, AuthUserAdmin)
admin.site.register(Buyer)
admin.site.register(Seller)
admin.site.register(BusinessFeedback)
