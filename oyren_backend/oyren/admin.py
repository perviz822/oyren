from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from oyren.models import( NewUser,Class,File,LoggedInUser)
from django.forms import Textarea

from oyren.models import Request
from oyren.models import Images
from oyren.models import Url



class UserAdminConfig(UserAdmin):
    ordering=('email',)
    list_display=('email','name','surname','is_teacher','is_active','is_staff','is_superuser')
    fieldsets=(
        (None,{'fields':('email','name','surname','classes','password')}),
        ('Permissions',{'fields':('is_staff','is_active','is_superuser')}),
        

    )


   
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name','surname','classes' ,'password1', 'password2', 'is_active', 'is_staff','is_superuser')}
         ),
    )

admin.site.register(NewUser,UserAdminConfig)
admin.site.register(Class)
admin.site.register(File)
admin.site.register(Request)
admin.site.register(Images)
admin.site.register(Url)
admin.site.register(LoggedInUser)



# Register your models here.
