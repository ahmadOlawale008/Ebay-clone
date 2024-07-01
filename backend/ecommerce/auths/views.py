from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import permission_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, SAFE_METHODS
from .serializers import UserSerializer
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
        print("----------------------------------------------------")
        print(user_data)
        print("----------------------------------------------------")
        if user_data.get("verified_email"):
            user, _ = get_user_model().objects.get_or_create(email=user_data["email"])
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
            refresh_token = RefreshToken.for_user(user=user)
            return Response(
                {
                    "refresh_token": str(refresh_token),
                    "access_token": str(refresh_token.access_token),
                }
            )
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
            refresh_token = RefreshToken.for_user(user=user)
            return Response(
                {
                    "refresh_token": str(refresh_token),
                    "access_token": str(refresh_token.access_token),
                },
                status=status.HTTP_200_OK,
            )
        except AuthUser.DoesNotExist:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

class UserCreatePermission(BasePermission):
    message = "Only post method requests are accepted."

    def has_object_permission(self, request, view, obj):
        if request.method == "post":
            return True
        return super().has_object_permission(request, view, obj)


class CreateUser(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [
        AllowAny,
    ]
    queryset = AuthUser

    def get_permissions(self):
        return super().get_permissions()


class UserDetails(generics.RetrieveDestroyAPIView):
    pass
