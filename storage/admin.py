from django.contrib import admin
from .models import Files
# Register your models here.

class PanelFiles(admin.ModelAdmin):
    list_display = ('id', 'filename', 'file', 'comment', 'uploaded_at', 'owner_id', 'size', 'download_link', 'downloaded_at')
    list_display_links = ('id', 'filename', 'comment')
    search_fields = ('filename', 'uploaded_at',  'comment')
    list_filter = ('filename', 'uploaded_at')


admin.site.register(Files, PanelFiles)

