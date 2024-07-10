from typing import Tuple
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions as Rest_Exception
from rest_framework_simplejwt.tokens import Token
class CustomAuthentication(JWTAuthentication):
    def enforce_csrf(self, request):
        def dummy_get_response(request):
            return None
        check = CSRFCheck(dummy_get_response)
        check.process_request(request)
        # process_view(request, view_func, view_args, view_kwargs)¶
        reason = check.process_view(request, None, (), {})
        if reason:
            raise Rest_Exception.PermissionDenied(f"CSRF authentication failed: {reason}")
    def authenticate(self, request: Request):
        header = self.get_header(request)
        if header is None:
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"], None)
        else:
            raw_token = self.get_raw_token(header)
            if raw_token is None:
                return None
        print(raw_token,request.COOKIES, "TOkenssssssss")

        validated_token = self.get_validated_token(raw_token)
        self.enforce_csrf(request)
        return self.get_user(validated_token), validated_token
