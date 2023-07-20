from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Friends(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friends")
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friends_do_not_use")

class FriendRequest(models.Model):
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name="out_requests")
    requestee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="in_requests")

    # Not Responded = False, Accepted or Denied = True
    status = models.BooleanField(default=False)

class Album(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)

class Song(models.Model):
    name = models.CharField(max_length=64)
    track_number = models.IntegerField()
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="songs")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "track_number": self.track_number,
            "album_id": self.album.id
        }

class Score(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="scores")
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name="scores")
    score = models.IntegerField(default=0)
    skip = models.BooleanField(default=False)
    favorite = models.BooleanField(default=False)