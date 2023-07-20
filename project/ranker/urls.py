from django.urls import path
from . import views

urlpatterns = [
    # User paths (paths that the user should be using)
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),

    # Redirect the login to the login page
    path("accounts/login/", views.login_redirect, name="login_redirect"),

    # API paths (paths that only JavaScript should be using to fetch data)
    path("albums", views.albums, name="api_albums"),
    path("songs/<int:album_id>", views.songs_by_album, name="api_songs_by_album"),
    path("songs/<int:album_id>/<int:track_number>", views.song_by_album_and_track, name="api_songs_by_album_and_track")
]