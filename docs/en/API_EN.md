# API

## Overview

- The API connects the Flask backend + database with the frontend.

- Base URL: <http://localhost:5000/api>
- Responses are formatted in JSON

## Endpoint Reference

### GET /songs

Returns all songs that meet the parameters

**Query Parameters:**

| Name       | Type   | Required    | Description             |
|------------|--------|-------------|-------------------------|
| genre_id   | str    | No          | Genre to search         |
| emotion_id | str    | No          | Emotion to search       |
| limit      | int    | No          | Search size limit       |

**Example Request:**

```bash
curl http://localhost:5000/songs?genre=Rock
```

**Success Response (200):**

``` json
[
    {
        "artist": "Queen",
        "explication_source": "explication_source/we_will_rock_you.wav",
        "id": 25,
        "source_id": "-tJYN-eG1zk",
        "title": "We Will Rock You",
        "description": "The song .... by the artist .... has been tagged and made by ..."
    }
]

```

### GET /songs/genres

Returns all genres saved in the database

**Query Parameters:**

| Name    | Type   | Required    | Description               |
|---------|--------|-------------|-------------------------- |
| limit   | int    | No          | How many genres to return |

**Example Request:**

```bash
curl http://localhost:5000/songs/genres?limit=2
```

**Successful response (200):**

``` json
[
    [
        1,
        "MPB",
        "genres/mpb.png"
    ],
    [
        2,
        "Sertanejo",
        "genres/sertanejo.png"
    ],
    [
        3,
        "Rock",
        "genres/rock.png"
    ],

```

### GET /songs/emotions

Returns all emotions saved in the database

**Query Parameters:**

| Name    | Type   | Required    | Description |
|---------|--------|-------------|---------------------------- |
| limit   | int    | No          | How many emotions to return |

**Example Request:**

```bash
curl http://localhost:5000/songs/emotions?limit=2
```

**Successful Response (200):**

``` json
[
    [
        14,
        "Welcoming"
    ],
    [
        21,
        "Joy"
    ],
]
```

## Error Handling

The system responds to errors in JSON with the following structure:

``` json
{

"error": "error_name",

"detail": "error_message"
}

// Example:

{
"error": "Not Found",

"detail": "No songs found for this combination"
}
```
