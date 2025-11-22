from django.urls import path
from .views import AnalyzeView, DownloadView
from .views_download_full import DownloadFullView

urlpatterns = [
    path("analyze/", AnalyzeView.as_view()),
    path("download/", DownloadView.as_view()),
    path("download-full/", DownloadFullView.as_view()),
]
