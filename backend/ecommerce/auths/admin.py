from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AuthUser, PersonalInfo, BusinessInfo, BusinessFeedback
def listFilter():
    pass
class AuthUserAdmin(UserAdmin):
    model = AuthUser
    fieldsets = [
        ("Personal Info", {"fields": ["email", "phoneNumber"]}),
        ("Account Type", {"fields": ["account_type"]}),
        ("Status", {"fields": ["is_staff", "is_superuser", "is_active"]}),
        ("Dates", {"fields": ["created",]}),
        ("Last Login", {"fields": ["last_login"]}),
    ]
    list_display = ["email", "phoneNumber", "is_staff", "is_superuser", "last_login"]
    search_fields = ["email", "phoneNumber", "account_type"]
    ordering = ["last_login"]
    @admin.display(description="Name")
    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name.lower()}".capitalize()

# Register your models here.
admin.site.register(AuthUser, AuthUserAdmin)
admin.site.register(PersonalInfo)
admin.site.register(BusinessInfo)
admin.site.register(BusinessFeedback)
