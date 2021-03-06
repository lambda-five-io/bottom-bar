# bottom-player

# REST API

The REST API for the bottom bar music player for basic CRUD operations.


# Grabbing Data
## Fetch all items from the database

### Request

`GET /songs/`

### Response

`Status: 200 OK`

This will return an array of JSON objects from the database:

Example:

    [
        {
            id: 1
            song_name: String
            artist_name: String
            song_image: String (url)
            song_audio: String (url)
            genre: String
            upload_date: Date
            album: String
        },

        {
            id: 2
            song_name: String
            artist_name: String
            song_image: String (url)
            song_audio: String (url)
            genre: String
            upload_date: Date
            album: String
        },
        .
        .
        .
        {
            id: n
            song_name: String
            artist_name: String
            song_image: String (url)
            song_audio: String (url)
            genre: String
            upload_date: Date
            album: String
        }
    ]

    ...where n is the number of items in the database.


## Fetch a single item from the database by ID

### Request

`GET /songs/id?=123`

### Response

`Status: 200 OK`

This will return a single JSON object from the database based on integer in query.

Example:

    {
        id: 123
        song_name: String
        artist_name: String
        song_image: String (url)
        song_audio: String (url)
        genre: String
        upload_date: Date
        album: String
    }

## Fetch a single item from the database by song name

### Request

`GET /songs/song_name?="Darkhorse"`

### Response

`Status: 200 OK`

This will return a single JSON object from the database based on String in query.

Example:

    {
        id: Integer
        song_name: "Darkhorse"
        artist_name: String
        song_image: String (url)
        song_audio: String (url)
        genre: String
        upload_date: Date
        album: String
    }

## Fetch all songs from artist in database

### Request

`GET /songs/artist_name?="KMFDM"`

### Response

`Status: 200 OK`

This will return an array of JSON object from the database based on String in query.

Example:

    [   
        {
            id: 1234
            song_name: String1
            artist_name: "KMFDM"
            song_image: String1 (url)
            song_audio: String1 (url)
            genre: Industrial
            upload_date: 01.02.03
            album: String1
        },

        {
            id: 1235
            song_name: String2
            artist_name: "KMFDM"
            song_image: String2 (url)
            song_audio: String2 (url)
            genre: Industrial
            upload_date: 01.02.03
            album: String2
        },

        .
        .
        .
    ]


## Fetch all songs from an album in the database

### Request

`GET /songs/album?="Exorcisms"`

### Response

`Status: 200 OK`

This will return an array of JSON object from the database based on String in query.

Example:

    [   
        {
            id: 1234
            song_name: String1
            artist_name: Bella Morte
            song_image: String1 (url)
            song_audio: String1 (url)
            genre: Goth_Rock
            upload_date: 01.02.03
            album: Exorcisms
        },

        {
            id: 1235
            song_name: String2
            artist_name: Bella Morte
            song_image: String2 (url)
            song_audio: String2 (url)
            genre: Goth_Rock
            upload_date: 01.02.03
            album: Exorcisms
        },

        .
        .
        .
    ]

## Fetch all songs from database by genre

### Request

`GET /songs/genre?="punk"`

### Response

`Status: 200 OK`

This will return an array of JSON object from the database based on String in query.

Example:

    [   
        {
            id: 4321
            song_name: String
            artist_name: String
            song_image: String (url)
            song_audio: String (url)
            genre: punk
            upload_date: Date
            album: String
        },

        {
            id: 9876
            song_name: String
            artist_name: String
            song_image: String (url)
            song_audio: String (url)
            genre: punk
            upload_date: Date
            album: String
        },

        .
        .
        .
    ]


# Posting Data
## Insert a single item to the database

### Request

`POST /songs`

The body of the request will be the entry to insert according to standard schema:

Example:

    {
        id: n + 1
        song_name: String
        artist_name: String
        song_image: String (url)
        song_audio: String (url)
        genre: String
        upload_date: Date
        album: String
    }

    ...where n is the number of items in the database

### Response

`Status: 201 (created) entry registered to database`


## Replace an item in the database with a different entry

### Request

`PUT /songs/:id`

The body of the request will be the replacement entry according to standard schema with different info:

Example: PUT /songs/123

    {
        id: 123
        song_name: String
        artist_name: String
        song_image: String (url)
        song_audio: String (url)
        genre: String
        upload_date: Date
        album: String
    }

### Response

`Status: 202 (replaced) entry replaced in database`


## Update information for an existing item in the database

### Request

`PATCH /songs/:id`

This would be used to update a path to an audio file or genre, although it technically could be anything.

Example:

PATCH /songs/123

Update song file for given artist and song with id 123 in the database by sending a JSON object in the body of the request for the data you need updated.

    {
        song_audio: String (url)
    }

...producing the same object but with updated song_audio value

### Response

`Status: 203 (updated) entry information updated in database`


# Deleting Data
## Delete an entry from the database

### Request

`DELETE /songs/:id`

Delete a song from the database at chosen ID.


### Response

`Status: 204 (deleted) entry in database`