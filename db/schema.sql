CREATE DATABASE IF NOT EXISTS audiblyBottomPlayer;

USE audiblyBottomPlayer;

CREATE TABLE IF NOT EXISTS songs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  song_name VARCHAR(50),
  artist_name VARCHAR(50),
  song_image VARCHAR(100),
  song_audio VARCHAR(100)
)

