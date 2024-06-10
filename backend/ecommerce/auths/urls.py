from django.urls import path
from .views import CreateUser
app_name = "authentication"
urlpatterns = [
    path("sign-up/", CreateUser.as_view(), name="sign-up-auth"),
]
