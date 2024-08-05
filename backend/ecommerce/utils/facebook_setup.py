from requests_oauthlib.oauth2_session import OAuth2Session
from requests_oauthlib.compliance_fixes import facebook_compliance_fix
from django.conf import settings
def facebook_callback(redirect_uri):
    session = OAuth2Session(
        client_id=settings["FACEBOOK_CLIENT_ID"], redirect_uri=redirect_uri
    )
    facebook = facebook_compliance_fix(session)
    authorization_url, state = facebook.authorization_url()
