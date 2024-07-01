from django.urls import path
from .views import (
    CreateUser,
    SignUpWithGoogleView,
    GoogleOAuth2SignUpCallbackView,
    GoogleOAuth2SignUpView,
)

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
app_name = "authentication"
urlpatterns = [
    path("signup/", CreateUser.as_view(), name="sign_up_auth"),
    path("signup/google", SignUpWithGoogleView.as_view(), name="sign_up_google"),
    path(
        "google/callback/signup",
        GoogleOAuth2SignUpCallbackView.as_view(),
        name="google_signup_callback",
    ),
    # path("signup/twitter", )
    # path("twitter/callback/signup",)
    path("api/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh_token"),
]
