from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class TimeStampedModel(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(
        auto_now_add=True, help_text="Date and time when the record was created."
    )
    updated_at = models.DateTimeField(
        auto_now=True, help_text="Date and time when the record was last updated."
    )

    class Meta:
        abstract = True


class AuditBaseModel(TimeStampedModel):
    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="%(class)s_created_by",
        help_text="User that created the record.",
    )
    updated_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="%(class)s_updated_by",
        help_text="User that last updated the record.",
    )

    class Meta:
        abstract = True


class Theme(AuditBaseModel):
    CATEGORIES_OPTIONS = [
        ("primary", "primary"),
        ("neutral", "neutral"),
        ("feedback", "feedback"),
    ]

    category = models.CharField(max_length=150, choices=CATEGORIES_OPTIONS)
    name = models.CharField(max_length=150, unique=True)
    color = models.CharField(max_length=150)
