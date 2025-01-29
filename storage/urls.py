from rest_framework import routers
from .api import FileListAPI, FileUploadAPI, FileSharedLinkAPI, FileDownloadAPI

router = routers.DefaultRouter()
router.register('api/files', FileListAPI, basename='all_files')
router.register('api/file/shared', FileSharedLinkAPI, basename='link')
router.register('api/file/upload', FileUploadAPI, basename='upload')
router.register('api/file/download', FileDownloadAPI, basename='download')
urlpatterns = router.urls
