CREATE KEYSPACE IF NOT EXISTS audiblyBottomPlayer WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE audiblyBottomPlayer;

CREATE TABLE songs (id INT PRIMARY KEY, song_name TEXT, song_image INT, song_audio INT, artist TEXT, genre TEXT, album TEXT, upload_date DATE);
CREATE TABLE songs_by_album (album TEXT, song_name TEXT, song_image INT, song_audio INT, artist TEXT, genre TEXT, upload_date DATE, PRIMARY KEY ((album), song_name));
CREATE TABLE songs_by_artist (artist TEXT, song_name TEXT, song_image INT, song_audio INT, genre TEXT, album TEXT, upload_date DATE, PRIMARY KEY ((artist), song_name));
CREATE TABLE songs_by_genre (genre TEXT, song_name TEXT, song_image INT, song_audio INT, artist TEXT, album TEXT, upload_date DATE, PRIMARY KEY ((genre), song_name));
-- CREATE TABLE song_count(id int PRIMARY KEY, label text);