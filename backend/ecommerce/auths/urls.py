from django.urls import path
from .views import CreateUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
app_name = "authentication"
urlpatterns = [
    path("sign-up/", CreateUser.as_view(), name="sign-up-auth"),
    path("api/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh_token"),
]
