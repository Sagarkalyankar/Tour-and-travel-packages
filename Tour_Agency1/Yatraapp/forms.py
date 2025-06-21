
from django import forms
from .models import Booking,TourPackage

class BookingForm(forms.ModelForm):
    travel_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))

    class Meta:
        model = Booking
        fields = ['travel_date', 'number_of_people']



class TourPackageForm(forms.ModelForm):
    class Meta:
        model = TourPackage
        fields = ['name', 'description', 'price', 'duration', 'location', 'image']
