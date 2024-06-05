from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AuthUser
def listFilter():
    pass
class AuthUserAdmin(UserAdmin):
    model = AuthUser
    fieldsets = [
        ("Personal Info", {"fields": ["first_name", "last_name"]}),
        ("Contact Info", {"fields": ["email", "phoneNumber"]}),
        ("Account Type", {"fields": ["user_type"]}),
        ("Status", {"fields": ["is_staff", "is_superuser", "is_active"]}),
        ("Last Login", {"fields": ["last_login"]})
    ]
    list_display = ["full_name", "email", "phoneNumber", "is_staff", "is_superuser", "last_login"]
    search_fields = ["first_name", "last_name", "email", "phoneNumber"]
    ordering = ["last_login"]
    @admin.display(description="Name")
    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name.lower()}".capitalize()

# Register your models here.
admin.site.register(AuthUser, AuthUserAdmin)
