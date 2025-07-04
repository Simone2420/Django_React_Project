from django.urls import path
from .views import *

urlpatterns = [
    path("notes/", NoteListCreateView.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", NoteDelete.as_view(), name="delete-note"),
]