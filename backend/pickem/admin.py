from django.contrib import admin

from pickem.models import Team, Game, SeasonPickem, Winner

# Register your models here.
admin.site.register(Team)
admin.site.register(Game)
admin.site.register(SeasonPickem)
admin.site.register(Winner)

# change view site link in admin page to actual site
admin.site.site_url = 'http://www.andrew-kincaid.com/'
