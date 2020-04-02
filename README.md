# bottom-player

# REST API

The REST API for the bottom bar music player for basic CRUD operations.

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
        },

        {
            id: 2
            song_name: string
            artist_name: string
            song_image: string (url)
            song_audio: string (url)
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
        }
    ]

    ...where n is the number of items in the database.


## Fetch a single item from the database by ID

### Request

`GET /song/id?=123`

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
    }

## Fetch a single item from the database by song name

### Request

`GET /song/song_name?="Darkhorse"`

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
    }

## Fetch a single item from the database by artist name

### Request

`GET /song/artist_name?="KMFDM"`

### Response

`Status: 200 OK`

This will return a single JSON object from the database based on string in query.

Example:

    {
        id: integer
        song_name: string
        artist_name: "KMFDM"
        song_image: string (url)
        song_audio: string (url)
    }


