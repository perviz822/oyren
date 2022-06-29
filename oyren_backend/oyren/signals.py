from django.contrib.auth import user_logged_in,user_logged_out
from django.dispatch import receiver
from  oyren.models import LoggedInUser

@receiver(user_logged_in)
def on_user_logged_in(sender,**kwargs):
    LoggedInUser.objects.create(user=kwargs.get('user')) 

