from utils import views
from rest_framework import routers

router = routers.SimpleRouter(trailing_slash=False)

router.register("theme", views.ThemeViewSet, basename="theme")

urlpatterns = router.urls
