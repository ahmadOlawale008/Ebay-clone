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
from .models import AuthUser, PersonalInfo, BusinessInfo
from django.contrib.auth import get_user_model
from utils.google_setup import google_callback, google_setup
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status

class SignUpWithGoogleView(APIView):
    def get(self, request):
        redirect_uri = request.build_absolute_uri(
            reverse("authentication.google_signup_callback")
        )
        return redirect(google_setup(redirect_uri))

class GoogleOAuth2SignUpView(APIView):
    def get(self, request):
        redirect_uri = request.build_absolute_uri(reverse("google_sign_up_callback"))
        auth_uri = request.build_absolute_uri()
        user_data = google_callback(redirect_uri, auth_uri)
        user, _ = get_user_model().objects.create(username=user_data["email"])

class GoogleOAuth2SignUpCallbackView(APIView):
    def get(self, request):
        redirect_uri = request.build_absolute_uri(reverse("google_sign_up_callback"))
        auth_uri = request.build_absolute_uri()
        user_data = google_callback(redirect_uri, auth_uri)
        user, _ = get_user_model().objects.get_or_create(email=user_data["email"])
        
        try:
            PersonalInfo.objects.get_or_create(user=user, first_name=user_data["first_name"], last_name=user_data["last_name"], middle_name=user_data["middle_name"])
        except user.DoesNotExist:
            print('An exception occurred')     
        refresh_token = RefreshToken.for_user(user=user)
        return Response(refresh_token, status=status.HTTP_201_CREATED)
    
def get_tokens_for_admin(user):
    access = AccessToken.for_user(user)
    return access


class UserCreatePermission(BasePermission):
    message = "Only post method requests are accepted."

    def has_object_permission(self, request, view, obj):
        if request.method == "post":
            return True
        return super().has_object_permission(request, view, obj)


class CreateUser(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny, ]
    queryset = AuthUser

    def get_permissions(self):
        return super().get_permissions()


class UserDetails(generics.RetrieveDestroyAPIView):
    pass
