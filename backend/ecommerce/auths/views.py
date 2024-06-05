from django.shortcuts import render
from django.contrib.auth.decorators import permission_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, SAFE_METHODS
from .serializers import UserSerializer
from rest_framework.permissions import BasePermission
from .models import AuthUser
# Create your views here.

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
    
class UserDetails(generics.RetrieveDestroyAPIView):
    pass