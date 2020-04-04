CREATE  KEYSPACE IF NOT EXISTS audiblyBottomPlayer
   WITH REPLICATION = { 
      'class' : 'SimpleStrategy', 'replication_factor' : 1 } 

USE audiblyBottomPlayer

CREATE TABLE songs (
	id int PRIMARY KEY
	song_name text,
	song_image text (url),
	song_audio text (url),
	artist text,
	genre text,
	album text,
	upload_date date
);

CREATE TABLE songs.songs_by_album (
	album text,
	song_name text,
	song_image text (url),
	song_audio text (url),
	artist text,
	genre text,
	upload_date date
	PRIMARY KEY ((album), song_name)
);

CREATE TABLE songs.songs_by_artist (
	artist text,
	song_name text,
	song_image text (url),
	song_audio text (url),
	genre text,
	album text,
	upload_date date
	PRIMARY KEY ((artist), song_name)
);

CREATE TABLE songs.songs_by_genre (
	genre text,
	song_name text,
	song_image text (url),
	song_audio text (url),
	artist text,
	album text,
	upload_date date
	PRIMARY KEY ((genre), song_name)

);

