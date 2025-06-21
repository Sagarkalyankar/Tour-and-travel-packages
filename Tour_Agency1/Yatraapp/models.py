from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Models for Travel and Tour Agency

# 1. User Profile (Optional: Extend User model if additional details are required)
class UserProfile(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    password = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
    
    class Meta:
        db_table="userprofile"

# 2. Tour Packages
class TourPackage(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)  # e.g., '5 Days, 4 Nights'
    location = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return self.name
    class Meta:
        db_table="tourpackage"

# 3. Bookings
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    package = models.ForeignKey(TourPackage, on_delete=models.CASCADE)
    booking_date = models.DateField(auto_now_add=True)
    travel_date = models.DateField()
    number_of_people = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2,default=0.00)
    payment_status = models.CharField(max_length=20, default='Pending')  # e.g., 'Paid', 'Pending'
    status = models.CharField(max_length=20, default='Pending')  # e.g., 'Pending', 'Confirmed', 'Cancelled'


    def __str__(self):
        return f"Booking by {self.user.username} for {self.package.name}"
    class Meta:
        db_table="booking"




class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"
    
class adminUser(models.Model):
    id = models.AutoField(primary_key=True) 
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username
    
    class Meta:
        db_table="adminData"
