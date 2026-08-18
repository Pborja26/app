from django.urls import path
from login import views

urlpatterns = [
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path(
        "token/refresh/", views.CustomTokenRefreshView.as_view(), name="token_refresh"
    ),
    path("logout/", views.LogoutView.as_view(), name="logout"),
]
