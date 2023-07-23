import json
from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Album, Score, Song, User

# Homepage
@login_required
def index(request):
    return render(request, "ranker/index.html")

# API
@login_required
def albums(request):
    # Create an array to store album ranking data
    album_ranking = []

    # Iterate over each album
    for album in Album.objects.all():
        # Set all scores to 0
        num_songs = 0
        total_score = 0
        favs = 0
        skips = 0

        # Add to scores using song and score data
        for song in Song.objects.filter(album=album).all():
            num_songs += 1

            score = Score.objects.get(user=request.user, song=song)
            total_score += score.score
            if score.favorite:
                favs += 1
            elif score.skip:
                skips += 1

        # Finalize scores
        if num_songs == 0:
            avg_score = 0
            fav_skip = 0
        else:
            avg_score = round(total_score/num_songs, 2)

            fav_percentage = round((favs / num_songs) * 100)
            skip_percentage = round((skips / num_songs) * 100)

            fav_skip = (0.5 * (100 - (fav_percentage + skip_percentage)) + fav_percentage)

        # Add scores to ranking array
        album_ranking.append({"id": album.id, "avg_score": avg_score, "fav_skip": fav_skip})

    return JsonResponse({"albums": album_ranking})


@login_required
def songs_by_album(request, album_id):
    album = Album.objects.get(id=album_id)
    songs = Song.objects.filter(album=album).all()

    songs = [song.serialize() for song in songs]
    for song in songs:
        score = Score.objects.get(user=request.user, song=song["id"])
        song["score"] = score.score
        song["favorite"] = score.favorite
        song["skip"] = score.skip

    return JsonResponse({"songs": songs})


@csrf_exempt
@login_required
def song_by_album_and_track(request, album_id, track_number):
    # Get models
    album = Album.objects.get(id=album_id)
    song = Song.objects.get(album=album, track_number=track_number)
    song = song.serialize()
    score = Score.objects.get(user=request.user, song=song["id"])

    if request.method == "GET":
        # Add information
        song["score"] = score.score
        song["favorite"] = score.favorite
        song["skip"] = score.skip

        # Send out the information
        return JsonResponse({"song": song})

    elif request.method == "PUT":
        data = json.loads(request.body)
        if data.get("score") is not None:
            if data["score"] == "":
                score.score = 0
            else:
                score.score = data["score"]
        if data.get("favorite") is not None:
            score.favorite = data["favorite"]
        if data.get("skip") is not None:
            score.skip = data["skip"]
        score.save()

        return HttpResponse(status=204)


# Login/Logout/Register
def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            if not username:
                message = "username must be filled out"
            elif not password:
                message = "password must be filled out"
            else:
                message = "username and/or password invalid"
    else:
        message = None

    return render(request, "ranker/login.html", {
        "message": message
    })


def login_redirect(request):
    return HttpResponseRedirect(reverse("login"))


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    # If user submitted the form
    if request.method == "POST":
        # Gather info
        username = request.POST["username"]
        password = request.POST["password"]

        # Check password is the same as confirmation
        if password != request.POST["confirmation"]:
            return render(request, "ranker/register.html", {
                "message": "password does not match confirmation"
            })

        # Attempt to create the user
        try:
            user = User.objects.create_user(username=username, password=password)
            user.save()
        except IntegrityError:
            # If user cannot be created, display this error
            return render(request, "ranker/register.html", {
                "message": "Username already taken."
            })

        # Load a 0 in for every song
        for song in Song.objects.all():
            score = Score()
            score.user = user
            score.song = song
            score.save()

        # If it is a success login and redirect the user
        login(request, user)
        return HttpResponseRedirect(reverse("index"))

    return render(request, "ranker/register.html")