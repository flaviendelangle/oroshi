from django.db import models

from api.TVShows.models import TVShows
from api.Users.models import Users


class TVShowCollections(models.Model):
    hash = models.CharField(max_length=128, default="")
    content = models.ManyToManyField(TVShows, verbose_name="list_of_tv_shows", related_name="collection_tv_shows")
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

    # Summary
    title = models.CharField(max_length=1000, default="")
    adult_content = models.BooleanField(default=0)

    # Spoilers
    hide_unseen_titles = models.BooleanField(default=0)

    # Languages
    title_language = models.CharField(max_length=2, default="en")
    poster_language = models.CharField(max_length=2, default="-")


class SeenTVShows(models.Model):
    tv_show = models.ForeignKey(TVShows, on_delete=models.CASCADE)
    collection = models.ForeignKey(TVShowCollections, on_delete=models.CASCADE)
    seen = models.BooleanField(default=0)
