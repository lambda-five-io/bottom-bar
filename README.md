# bottom-player

# REST API

The REST API for the bottom bar for basic CRUD operations.

## Fetch all items from the database

### Request

`GET /songs/`

### Response

`Status: 200 OK`

This will return an array of JSON objects from the database:

`Example`

[  
    {  
        id: integer<br/>
        song_name: string  
        artist_name: string  
        song_img: string (url)  
        song_audio: string (url)  
    }  
]

### Request

`GET /thing/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}