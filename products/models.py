from django.db import models
from general.models import BaseOrder, AutoMetadataMixin
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Order(BaseOrder):
    status = models.CharField(max_length=12, default="Received")
    phone = models.CharField(max_length=12)

    def _get_total(self):
        "Returns the total"
        sum = 0
        for item in self.item_orderid.all():
            sum += item.sub_total
        return sum

    total = property(_get_total)

    def _get_tax(self):
        "Returns the tax"
        tx = 0.1 * self.total_tax
        return tx

    tax = property(_get_tax)

    class Meta:
        verbose_name = 'order'

    def __str__(self):
        return self.status


class Item(AutoMetadataMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    item_name = models.CharField(max_length=255, verbose_name='item_name')
    item_order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="item_order", blank=True, null=True)
    # product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="checkout_item_product")
    quantity = models.PositiveSmallIntegerField(verbose_name='quantity')
    # price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='price')
    price = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)], verbose_name='price')

    def _get_subtotal(self):
        "Returns the total"
        return self.quantity * self.price

    sub_total = property(_get_subtotal)

    class Meta:
        verbose_name = 'checkout item'

    def __str__(self):
        return "item_name: {} price: {}".format(self.item_name)


class Payment(AutoMetadataMixin):
    PAYMENT_METHOD_CHOICES = (
        ("credit_card", "credit_card"),
        ("bank_slip", "billet")
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    # id = models.CharField(primary_key=True, max_length=255, verbose_name='payment_id')
    payment_order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payment_order", blank=True, null=True)
    # payment_method = models.CharField(max_length=255, choices=PAYMENT_METHOD_CHOICES, verbose_name='payment_method')
    payment_method = models.CharField(max_length=255, verbose_name='payment_method')
    card_number = models.CharField(max_length=255, verbose_name='delivery_method')
    bill_addr1 = models.CharField(max_length=200)
    bill_addr2 = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    zipcode = models.CharField(max_length=200)


    class Meta:
        verbose_name = 'payment'

    def __str__(self):
        return self.payment_order

class Shipping(AutoMetadataMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ship_payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name="ship_payment", blank=True, null=True)
    ship_charge = models.IntegerField(verbose_name='ship_charge')
    bill_addr1 = models.CharField(max_length=200)
    bill_addr2 = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    zipcode = models.CharField(max_length=200)
