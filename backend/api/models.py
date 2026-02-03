from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('FARMER', 'Farmer'),
        ('RICE_MILL', 'Rice Mill'),
        ('CUSTOMER', 'Customer'),
    )
    
    VERIFICATION_STATUS = (
        ('PENDING', 'Pending'),
        ('VERIFIED', 'Verified'),
        ('REJECTED', 'Rejected'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='FARMER')
    phone = models.CharField(max_length=15, blank=True)
    location = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    avatar_icon = models.CharField(max_length=5, default='👨🌾')
    
    # Verification Fields
    is_verified = models.BooleanField(default=False)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS, default='PENDING')
    
    # AI Verification Data (Simple Names)
    user_photo = models.ImageField(upload_to='verification/selfies/', null=True, blank=True)
    id_proof = models.ImageField(upload_to='verification/ids/', null=True, blank=True)
    
    # Role-specific verification
    farm_photo = models.ImageField(upload_to='verification/farms/', null=True, blank=True, help_text="For Farmers: Farmland/Crop photo")
    mill_photo = models.ImageField(upload_to='verification/mills/', null=True, blank=True, help_text="For Rice Mills: Machinery/Premises photo")
    
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"
