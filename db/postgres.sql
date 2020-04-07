-- CREATE DATABASE audiblyBottomPlayer

-- \c audiblyBottomPlayer
CREATE TABLE artists (
	artist_id SERIAL,
	artist_name VARCHAR(100),
	PRIMARY KEY (artist_id)
);

CREATE TABLE albums (
	album_id SERIAL,
	album_name VARCHAR(100),
	upload_date DATE,
	artist_id INTEGER,
	PRIMARY KEY (album_id),
	FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
	
);

CREATE TABLE songs (
	song_id SERIAL,
	song_name VARCHAR(100),
	song_image TEXT,
	song_audio TEXT,
	genre VARCHAR(20),
	album_id INTEGER,
	PRIMARY KEY (song_id),
	FOREIGN KEY (album_id) REFERENCES albums (album_id)
);


