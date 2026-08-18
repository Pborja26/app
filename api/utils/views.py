from rest_framework import viewsets
from utils import models as utils_models
from utils import serializers as utils_serializers


# Create your views here.
class ThemeViewSet(viewsets.ModelViewSet):
    queryset = utils_models.Theme.objects.all()
    serializer_class = utils_serializers.ThemeSerializer

    def __str__(self):
        return str(self.pk)
