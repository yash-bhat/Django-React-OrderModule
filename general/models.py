from django.db import models
import uuid


class AutoMetadataMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        abstract = True


class BaseOrder(AutoMetadataMixin):
    order_id = models.UUIDField(primary_key=True, verbose_name='order_id', default=uuid.uuid4)
    # order_id = models.CharField(primary_key=True, max_length=255, verbose_name='order_id')
    name = models.CharField(max_length=255, verbose_name='name')
    customer_id = models.CharField(max_length=255, verbose_name='customer-id')

    class Meta:
        abstract = True

    def __str__(self):
        return self.name