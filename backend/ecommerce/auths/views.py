from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.decorators import permission_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, VALIDATION_MESSAGES, UserModel
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from .models import AuthUser, Buyer, Seller
from django.contrib.auth import get_user_model
from utils.google_setup import google_callback, google_setup
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
import requests
from django.core.files.base import ContentFile
from django.middleware import csrf
from django.contrib.auth import authenticate
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


def get_user_token(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class SignUpWithGoogleView(APIView):
    def get(self, request):
        redirect_uri = request.build_absolute_uri(
            reverse("authentication:google_signup_callback")
        )
        return redirect(google_setup(redirect_uri))


class LoginWithGoogleView(APIView):
    def get(self, request):
        redirect_uri = request.build_absolute_uri(
            reverse("authentication:google_login_callback")
        )
        return redirect(google_setup(redirect_uri))

class GoogleOAuth2SignUpCallbackView(APIView):
    def get(self, request):
        redirect_uri = request.build_absolute_uri(
            reverse("authentication:google_signup_callback")
        )
        auth_uri = request.build_absolute_uri()
        user_data = google_callback(redirect_uri, auth_uri)
        user_picture = user_data.get("picture")
        if user_data.get("verified_email"):
            user, _ = get_user_model().objects.get_or_create(
                email=user_data["email"], verified_email=True
            )
            buyer = Buyer(
                user=user,
                first_name=user_data["given_name"],
                last_name=user_data["family_name"],
                google_id=user_data["id"],
            )
            if user_picture:
                resp = requests.get(user_picture)
                if resp.status_code == 200:
                    buyer.profile_image.save(
                        user_picture.split("/")[-1],
                        ContentFile(resp.content),
                        save=True,
                    )
            buyer.save()
            refresh_token = get_user_token(user=user)
            return Response(refresh_token)
        return Response(
            {"error": "Email verification was not sucessfull."},
            status=status.HTTP_403_FORBIDDEN,
        )


class GoogleOAuth2LoginCallbackView(APIView):
    def get(self, request):
        redirect_uri = request.build_absolute_uri(
            reverse("authentication:google_login_callback")
        )
        auth_uri = request.build_absolute_uri()
        user_data = google_callback(redirect_uri, auth_uri)
        try:
            user = get_user_model().objects.get(email=user_data.get("email"))
            token = get_user_token(user)
            return Response(token, status=status.HTTP_200_OK)
        except AuthUser.DoesNotExist:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )


class LoginView(APIView):
    def post(self, request):
        data = request.POST
        print(data, "DATA--------------->DATA--------------")
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)
        response = Response()
        if user is not None:
            if user.is_active():
                response.set_cookie(
                    key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                    value=data["access"],
                    expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                    secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                    httponly=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                    samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                )
                csrf.get_token(request)
                response.data = {"Authentication_status": "Successfull", "data": data}
                response.status_code = 200
                return response
            else:
                response.data = {
                    "Authentication_status": "Failed",
                    "error": "Invalid email or password",
                }
                response.status_code = status.HTTP_401_UNAUTHORIZED
                return response
        else:
            response.data = {
                "Authentication_status": "Failed",
                "error": "Invalid email or password",
            }
            response.status_code = status.HTTP_404_NOT_FOUND
            return response


class UserCreatePermission(BasePermission):
    message = "Only post method requests are accepted."

    def has_object_permission(self, request, view, obj):
        if request.method == "post":
            return True
        return super().has_object_permission(request, view, obj)


@csrf_exempt
def check_email_exists(request):
    if request.method == "POST":
        email = request.POST.get("email", None)
        print(request.POST.get)
        if AuthUser.objects.filter(email=email).exists():
            return JsonResponse(
                {
                    "valid": False,
                    "emailTaken": True,
                    "error": VALIDATION_MESSAGES["EMAIL"]["DUPLICATE_ENTRY"],
                    "errorTextAriaLbl": "Your email address is already registered with eBay. Need help with your password?",
                }
            )
        return JsonResponse(
            {
                "valid": True,
                "emailTaken": False,
            }
        )
    return JsonResponse(
        {"unauthorized": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED
    )


class CreateUser(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        AllowAny,
    ]

class UserDetails(generics.RetrieveDestroyAPIView):
    pass
