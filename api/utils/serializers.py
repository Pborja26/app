from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from utils import models as utils_models


class ThemeListSerializer(serializers.ListSerializer):
    @property
    def data(self):
        return ReturnDict(super(serializers.ListSerializer, self).data, serializer=self)

    def to_representation(self, data):
        themes = super().to_representation(data)
        result = {}

        for theme in themes:
            category = theme["category"]
            name = theme["name"]
            color = theme["color"]

            result.setdefault(category, {})[name] = color

        return result


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = utils_models.Theme
        fields = ["category", "name", "color"]
        list_serializer_class = ThemeListSerializer
