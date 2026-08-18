from django.contrib import admin
from utils import models as utils_models


# Register your models here.
class BaseModelAdmin(admin.ModelAdmin):
    readonly_fields = ("created_by", "created_at", "updated_by", "updated_at")

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.created_by = request.user
        obj.updated_by = request.user
        obj.save()


@admin.register(utils_models.Theme)
class ThemeAdmin(BaseModelAdmin):
    list_display = ["name", "category", "color"]
    list_filter = ["category"]
    search_fields = ["name", "category", "color"]
