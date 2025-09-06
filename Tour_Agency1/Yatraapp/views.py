# Standard Library imports
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Rest Framework imports
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

# Local imports
from .models import (
    TourPackage, 
    Booking, 
    UserProfile, 
    adminUser, 
    ContactMessage
)
from .forms import BookingForm, TourPackageForm
from .serializers import UserProfileSerializer, adminSerializer, ContactMessageSerializer

# Authentication Views
@api_view(['POST'])
def register_user(request):
    """Register a new user and create their profile."""
    data = request.data
    
    user = User.objects.create_user(
        username=data['username'],  
        password=data['password']
    )

    user_profile = UserProfile.objects.create(
        username=user,
        password=data['password'],  
        phone_number=data.get('phone_number', ''),
        email=data.get('email', ''),
        address=data.get('address', '')
    )

    return Response({'message': 'Registration successful, Please Login'})

@api_view(['POST'])
def login_user(request):
    """Authenticate and login regular users."""
    data = request.data
    username = data.get('username')
    password = data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        user_serializer = UserProfileSerializer(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': user_serializer.data,
            'message': f'Welcome {username}'
        })
    
    return Response({'message': 'Invalid Username or Password'}, status=400)

@api_view(['POST'])
def login_admin(request):
    """Authenticate and login admin users."""
    data = request.data
    username = data.get('username')
    password = data.get('password')

    session = request.session['username'] = username
    try:
        admin_user = adminUser.objects.get(username=username)
        if admin_user.password == password:
            refresh = RefreshToken.for_user(adminUser)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': f'Welcome {username}'
            })
        return Response({'message': 'Invalid Password'}, status=400)
    except:
        return Response({'message': 'Invalid Username'}, status=400)

# Package Management Views
@api_view(['GET'])
def home(request):
    """List all tour packages."""
    packages = TourPackage.objects.all().values()  
    return Response({'packages': packages})

@api_view(['GET'])
def package_details(request, id):
    """Get details of a specific package."""
    package = get_object_or_404(TourPackage, id=id)
    return Response({
        'package': {
            'id': package.id,
            'name': package.name,
            'description': package.description,
            'price': package.price,
            'duration': package.duration,
            'location': package.location,
            'image': str(package.image)
        }
    })

@api_view(['POST'])
def add_package(request):
    """Add a new tour package."""
    data = request.data
    TourPackage.objects.create(
        name=data['package_name'],
        description=data['description'],
        price=data['price'],
        duration=data['duration'],
        location=data['location'],
        image=data['image']
    )
    return Response({'message': 'Package created successfully'})

@api_view(['POST'])
def edit_package(request, package_id):
    """Edit an existing tour package."""
    package = get_object_or_404(TourPackage, id=package_id)
    data = request.data
    for field in ['package_name', 'description', 'price', 'duration', 'location', 'image']:
        if field in data:
            setattr(package, field.replace('package_name', 'name'), data[field])
    package.save()
    return Response({'message': 'Package updated successfully'})

@api_view(['POST'])
def delete_package(request, package_id):
    """Delete a tour package."""
    package = get_object_or_404(TourPackage, id=package_id)
    package.delete()
    return Response({'message': 'Package deleted successfully'})

# Booking Views
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def book_package(request, id):
    """Book a tour package."""
    data = request.data
    required_fields = ['travel_date', 'number_of_people']
    
    if not all(field in data for field in required_fields):
        return Response({'error': 'Missing required fields'}, status=400)

    try:
        package = get_object_or_404(TourPackage, id=id)
        booking = Booking.objects.create(
            user=request.user,
            package=package,
            travel_date=data['travel_date'],
            number_of_people=data['number_of_people']
        )
        return Response({'message': 'Booking successful', 'booking_id': booking.id}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def bookings(request):
    """List all bookings (admin view)."""
    bookings = Booking.objects.all().values(
        'id', 'user__username', 'package__name', 'travel_date', 'number_of_people'
    )
    return Response({'bookedPackages': bookings})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_bookings(request):
    """List bookings for the current user."""
    bookings = Booking.objects.filter(user=request.user.id).values(
        'id', 'package__name', 'travel_date', 'number_of_people'
    )
    return Response({'bookings': list(bookings)})

# User Profile Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """Get current user's profile."""
    try:
        profile = UserProfile.objects.get(username__id=request.user.id)  
        return Response({
            'username': request.user.username,
            'email': profile.email,
            'phone_number': profile.phone_number,
            'address': profile.address
        })
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=404)

@api_view(['GET'])
@permission_classes([AllowAny])
def users(request):
    """List all users (admin view)."""
    user_profiles = UserProfile.objects.all()
    users = [{
        'username': u.username.username,
        'id': u.id,
        'phone_number': u.phone_number,
        'address': u.address
    } for u in user_profiles]
    return Response({'users': users})

# Contact Message Views
@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact_message(request):
    """Submit a contact message."""
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "message": "Message sent successfully!"})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def getMessages(request):
    """List all contact messages."""
    messages = ContactMessage.objects.all().values()
    return Response({'messages': list(messages)})