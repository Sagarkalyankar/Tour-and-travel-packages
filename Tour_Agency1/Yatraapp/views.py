from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .models import TourPackage, Booking, UserProfile, adminUser, ContactMessage
from .forms import BookingForm, TourPackageForm
from .serializers import UserProfileSerializer, adminSerializer, ContactMessageSerializer


@api_view(['GET'])
def home(request):
    
    packages = TourPackage.objects.all().values()  
    return Response({'packages': packages})

@api_view(['POST'])
def register_user(request):
    data = request.data
    
    # Create User instance
    user = User.objects.create_user(
        username=data['username'],  
        password=data['password']
    )

    # Create UserProfile and link it to User
    user_profile = UserProfile.objects.create(
        username=user,  # Assign the User instance, not a string
        password=data['password'],  
        phone_number=data.get('phone_number', ''),
        email=data.get('email', ''),
        address=data.get('address', '')
    )

    return Response({'message': 'Registration successful, Please Login'})

# @api_view(['POST'])
# def login_user(request):
#     data = request.data
#     username = data['username']
#     password = data['password']
#     try:
#         user = User.objects.get(username=username)
#         if user.password == password:
#             return Response({'message': f'Welcome {username}'})
#         else:
#             return Response({'message': 'Invalid Credentials'}, status=400)
#     except User.DoesNotExist:
#         return Response({'message': 'Invalid Username'}, status=400)


@api_view(['POST'])
def login_user(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    print(f"Login attempt - Username: {username}, Password: {password}")  # Debugging

    # seession=request.session['username']=username

    user = authenticate(username=username,password=password)
    if user is not None:
            refresh = RefreshToken.for_user(user)
            user_serializer = UserProfileSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_serializer.data,
                'message': f'Welcome {username}'
            })
    
    else:
        print("Authentication failed")  # Debugging
        return Response({'message': 'Invalid Username or Password'}, status=400)
    

@api_view(['POST'])
def login_admin(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    print(f"Login attempt - Username: {username}, Password: {password}")  # Debugging

    seession=request.session['username']=username
    try:
        userfromdb=adminUser.objects.get(username=username)
    except:
        print("Authentication failed")  # Debugging
        return Response({'message': 'Invalid Username'}, status=400)
    

    if userfromdb.password == password:
        admin = adminSerializer
        refresh = RefreshToken.for_user(adminUser)
        return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                # 'admin' : seession.username,
                'message': f'Welcome {username}'
            })

    else:
        print("Authentication failed")  # Debugging
        return Response({'message': 'Invalid Password'}, status=400)
    
    
    # else:
    #     print("Authentication failed")  # Debugging
    #     return Response({'message': 'Invalid Username or Password'}, status=400)


@api_view(['GET'])
def package_details(request, id):
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
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def book_package(request, id):
    print("Incoming request to book_package")
    print("URL id:", id)
    print("Request body:", request.data)

    data = request.data
    required_fields = ['travel_date', 'number_of_people']
    for field in required_fields:
        if field not in data:
            return Response({'error': f'{field} is required'}, status=400)

    user = request.user
    package = get_object_or_404(TourPackage, id=id)

    try:
        booking = Booking.objects.create(
            user=user,
            package=package,
            travel_date=data['travel_date'],
            number_of_people=data['number_of_people']
        )
        return Response({'message': 'Booking successful', 'booking_id': booking.id}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# @api_view(['GET'])
# def manage_packages(request):
#     packages = TourPackage.objects.values()
#     return Response({'packages': list(packages)})

@api_view(['POST'])
def add_package(request):
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
    package = get_object_or_404(TourPackage, id=package_id)
    data = request.data
    package.name = data.get('package_name', package.name)
    package.description = data.get('description', package.description)
    package.price = data.get('price', package.price)
    package.duration = data.get('duration', package.duration)
    package.location = data.get('location', package.location)
    package.image = data.get('image', package.image)
    package.save()
    return Response({'message': 'Package updated successfully'})

@api_view(['POST'])
def delete_package(request, package_id):
    package = get_object_or_404(TourPackage, id=package_id)
    package.delete()
    return Response({'message': 'Package deleted successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(username__id=user.id)  
        return Response({
            'username': user.username,
            'email': profile.email,
            'phone_number': profile.phone_number,
            'address': profile.address
        })
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=404)
    

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def user_bookings(request):
    user = request.user
    bookings = Booking.objects.filter(user=user.id).values(
        'id', 'package__name', 'travel_date', 'number_of_people'
    )
    return Response({'bookings': list(bookings)})


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def bookings(request):
    
    bookings = Booking.objects.all().values(
        'id', 'user__username', 'package__name', 'travel_date', 'number_of_people'
    )
    return Response({'bookedPackages': bookings})



@api_view(['POST'])
@permission_classes([AllowAny])  # Open for everyone
def submit_contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "message": "Message sent successfully!"})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def getMessages(request):
    messages = ContactMessage.objects.all().values()
    return Response({'messages':list(messages)})



@api_view(['GET'])
@permission_classes([AllowAny])
def users(request):
    user_profiles = UserProfile.objects.all()
    users = []
    for u in user_profiles:
        users.append({
            'username': u.username.username,  # Accessing the related User object's username
            'id': u.id,
            'phone_number': u.phone_number,
            'address': u.address
        })
    return Response({'users': users})
