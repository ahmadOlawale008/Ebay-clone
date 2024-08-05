from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions as Rest_Exception

def enforce_csrf(request):
    check = CSRFCheck()
    check.process_request(request)
    # process_view(request, view_func, view_args, view_kwargs)¶
    reason = check.process_view(request, None, (), {})
    if reason:
        raise Rest_Exception.PermissionDenied("CSRF authentication failed: %s" % reason)


class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        print(header, "Yes Header")
        if header is None:
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"]) or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None
        print("Raw token %s" % raw_token)
        validated_token = self.get_validated_token(raw_token)
        enforce_csrf(request)
        return self.get_user(validated_token), validated_token
from django.middleware.csrf import CsrfViewMiddleware

class CustomCsrfMiddleware(CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        if 'HTTP_X_CSRFTOKEN' not in request.META:
            csrf_token = request.COOKIES.get('csrftoken')
            if csrf_token:
                request.CSRF_COOKIE = csrf_token
                request.META['HTTP_X_CSRFTOKEN'] = csrf_token
        super().process_view(request, callback, callback_args, callback_kwargs)