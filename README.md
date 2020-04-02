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
            song_name: string
            artist_name: string
            song_image: string (url)
            song_audio: string (url)
            genre: string
            albums: array
            related: array
        },

        {
            id: 2
            song_name: string
            artist_name: string
            song_image: string (url)
            song_audio: string (url)
            genre: string
            albums: array
            related: array
        },
        .
        .
        .
        {
            id: n
            song_name: string
            artist_name: string
            song_image: string (url)
            song_audio: string (url)
            genre: string
            albums: array
            related: array
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
        song_name: string
        artist_name: string
        song_image: string (url)
        song_audio: string (url)
        genre: string
        albums: array
        related: array
    }

## Fetch a single item from the database by song name

### Request

`GET /songs/song_name?="Darkhorse"`

### Response

`Status: 200 OK`

This will return a single JSON object from the database based on string in query.

Example:

    {
        id: integer
        song_name: "Darkhorse"
        artist_name: string
        song_image: string (url)
        song_audio: string (url)
        genre: string
        albums: array
        related: array
    }

## Fetch all songs from database by artist

### Request

`GET /songs/artist_name?="KMFDM"`

### Response

`Status: 200 OK`

This will return an array of JSON object from the database based on string in query.

Example:

    [   
        {
            id: 1234
            song_name: string1
            artist_name: "KMFDM"
            song_image: string1 (url)
            song_audio: string1 (url)
            genre: string
            albums: array
            related: array
        },

        {
            id: 1235
            song_name: string2
            artist_name: "KMFDM"
            song_image: string2 (url)
            song_audio: string2 (url)
            genre: string
            albums: array
            related: array
        },

        .
        .
        .
    ]

## Fetch all songs from database by genere

### Request

`GET /songs/genre?="punk"`

### Response

`Status: 200 OK`

This will return an array of JSON object from the database based on string in query.

Example:

    [   
        {
            id: 4321
            song_name: string1
            artist_name: string1
            song_image: string1 (url)
            song_audio: string1 (url)
            genre: punk
            albums: array
            related: array
        },

        {
            id: 9876
            song_name: string2
            artist_name: string1
            song_image: string2 (url)
            song_audio: string2 (url)
            genre: punk
            albums: array
            related: array
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
        song_name: string
        artist_name: string
        song_image: string (url)
        song_audio: string (url)
        genre: string
        albums: array
        related: array
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
        song_name: string
        artist_name: string
        song_image: string (url)
        song_audio: string (url)
        genre: string
        albums: array
        related: array
    }

### Response

`Status: 202 (replaced) entry replaced in database`


## Update information for an existing item in the database

### Request

`PATCH /songs?key1=value1&key2=value2`

The body of the request will be the data to update for item with two specified keys and values.
Example:

`PATCH /songs?song_name="Precipice"&artist_name="Rabbit Junk"

This would be used to update a path to an audio file or genre, although it technically could be anything.
Two key value pairs are required to reduce conflicts.

Update song file for Precipice by Rabbit Junk

    {
        song_audio: string (url)
    }

### Response

`Status: 203 (updated) entry replaced in database`


# Deleting Data
## Delete an entry from the database

### Request

`DELETE /songs?id=id_value&song_name="imagine"`

Can delete a song from the database if you have the correct id and associated song name.


### Response

`Status: 204 (deleted) entry in database`