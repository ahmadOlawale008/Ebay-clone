from django.urls import path
from .views import (
    CreateUser,
    LoginView,
    SignUpWithGoogleView,
    LoginWithGoogleView,
    GoogleOAuth2LoginCallbackView,
    GoogleOAuth2SignUpCallbackView,
    check_email_exists
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CookieObtainTokenPairView

app_name = "authentication"
urlpatterns = [
    path("signup/", CreateUser.as_view(), name="sign_up_auth"),
    path("login/", LoginView.as_view(), name="login_auth"),
    path("signup/google", SignUpWithGoogleView.as_view(), name="sign_up_google"),
    path("login/google", LoginWithGoogleView.as_view(), name="sign_up_google"),
    path(
        "google/callback/signup",
        GoogleOAuth2SignUpCallbackView.as_view(),
        name="google_signup_callback",
    ),
    path(
        "google/callback/login",
        GoogleOAuth2LoginCallbackView.as_view(),
        name="google_login_callback",
    ),
    # path("signup/twitter", )
    # path("twitter/callback/signup",)
    path("api/token/", CookieObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("check_email_exists", check_email_exists, name="check_email_exists"),
]
