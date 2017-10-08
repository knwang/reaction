# Table of Contents

- [API Documentation](#api-documentation)
    - [Example API Error Format](#example-api-error-format)
    - [GET /](#get-)
    - [GET /boards/:id](#get-boardsid)
    - [GET /cards/:id](#get-cardsid)
    - [GET /ui](#get-ui)
    - [GET /api/boards](#get-apiboards)
        - [Controller#Action](#controlleraction)
        - [Expected parameters](#expected-parameters)
        - [Example Response](#example-response)
    - [POST /api/boards](#post-apiboards)
        - [Controller#Action](#controlleraction-1)
        - [Expected Payload](#expected-payload)
        - [Successful Response](#successful-response)
            - [Example Response](#example-response-1)
        - [Error Response](#error-response)
    - [GET /api/boards/:id](#get-apiboardsid)
        - [Controller#Action](#controlleraction-2)
        - [Expected Payload](#expected-payload-1)
        - [Successful Response](#successful-response-1)
            - [Example Response](#example-response-2)
        - [Error Response](#error-response-1)
    - [POST /api/lists](#post-apilists)
        - [Controller#Action](#controlleraction-3)
        - [Expected Payload](#expected-payload-2)
        - [Successful Response](#successful-response-2)
            - [Example Response](#example-response-3)
        - [Error Response](#error-response-2)
    - [PUT/PATCH /api/lists/:id](#putpatch-apilistsid)
        - [Controller#Action](#controlleraction-4)
        - [Expected Payload](#expected-payload-3)
        - [Successful Response](#successful-response-3)
            - [Example Response](#example-response-4)
        - [Error Response](#error-response-3)
    - [POST /api/cards](#post-apicards)
        - [Controller#Action](#controlleraction-5)
        - [Expected Payload](#expected-payload-4)
        - [Successful Response](#successful-response-4)
            - [Example Response](#example-response-5)
        - [Error Response](#error-response-4)
    - [GET /api/cards/:id](#get-apicardsid)
        - [Controller#Action](#controlleraction-6)
        - [Expected Payload](#expected-payload-5)
        - [Successful Response](#successful-response-5)
            - [Example Response](#example-response-6)
        - [Error Response](#error-response-5)
    - [PUT/PATCH /api/cards/:id](#putpatch-apicardsid)
        - [Controller#Action](#controlleraction-7)
        - [Expected Payload](#expected-payload-6)
            - [Example Payload](#example-payload)
        - [Successful Response](#successful-response-6)
            - [Example Response](#example-response-7)
        - [Error Response](#error-response-6)
    - [POST /api/comments](#post-apicomments)
        - [Controller#Action](#controlleraction-8)
        - [Expected Payload](#expected-payload-7)
        - [Successful Response](#successful-response-7)
            - [Example Response](#example-response-8)
        - [Error Response](#error-response-7)

# API Documentation

## Example API Error Format

All of the `/api` routes use the following format to return errors:

```json
{
		"error": "Invalid board id provided"
}
```

## GET /

This route is used to render the template which renders the assets so that React can take over and render our boards index.

## GET /boards/:id

This route is also used to render the template. If we don’t have this route, people will not be able to navigate directly to boards. They would need to access `/` and then click on a board, every time.

## GET /cards/:id

Same as `GET /boards/:id`.

## GET /ui

This page lists the static ui designs which should be used to build the React components.

## GET /api/boards

Get all boards from the database. This does not return any nested data.

### Controller#Action

`api/boards#index`

### Expected parameters

None

### Example Response

```json
[
	{
		"id": 1,
		"title": "Web dev",
		"created_at": "2017-10-04T05:57:02.777Z",
		"updated_at": "2017-10-04T05:57:02.777Z"
	},
	{
		"id": 2,
		"title": "Cooking",
		"created_at": "2017-10-04T15:29:04.095Z",
		"updated_at": "2017-10-04T15:29:04.095Z"
	}
]
```

## POST /api/boards

Creates a board.

### Controller#Action

`api/boards#create`

### Expected Payload

```json
{
	"board": {
		"title": "My new board"
	}
}
```

### Successful Response

The new board is returned in JSON format with a 201 response status code.

#### Example Response

```json
{
	"id": 12,
	"title": "My new board",
	"created_at": "2017-10-06T23:08:28.375Z",
	"updated_at": "2017-10-06T23:08:28.375Z"
}
```

### Error Response

If no title is provided, an error will be returned with a 422 “Unprocessable Entity” status code.

## GET /api/boards/:id

Retrieve the board with the given `id`.

### Controller#Action

`api/boards#show`

### Expected Payload

None

### Successful Response

The board is returned with the following nested data:

- board -\>
	- lists -\>
		- list -\>
			- cards -\>
				- card

Cards do not include all of the card data. This response includes only the following data for cards: `id`, `title`, `due_date`, `labels`, `description`, `list_id`, `board_id, position`, `comments_count`.

The response status code is 200.

#### Example Response

```json
{
	"id": 1,
	"title": "Web dev",
	"created_at": "2017-10-04T05:57:02.777Z",
	"updated_at": "2017-10-04T05:57:02.777Z",
	"lists": [
		{
			"id": 3,
			"title": "CSS",
			"board_id": 1,
			"created_at": "2017-10-04T06:53:39.302Z",
			"updated_at": "2017-10-04T06:53:39.302Z",
			"position": 65535.0,
			"cards": [
				{
					"id": 7,
					"title": "1",
					"due_date": null,
					"labels": [
						"red",
						"purple"
					],
					"description": "Selectors",
					"list_id": 3,
					"board_id": 1,
					"position": 65535.0,
					"comments_count": 0
				}
			]
		}
	]
}
```

### Error Response

If the board doesn’t exist an error will be returned with a 404 status code.

## POST /api/lists

Creates a list.

### Controller#Action

`api/lists#create`

### Expected Payload

NOTE: The `board_id` where the list will reside is required.

```json
{
	"board_id": 1,
	"list": { 
		"title": "My list"
	}
}
```

### Successful Response

The list is returned in JSON form with a 201 status code.

#### Example Response

```json
{
	"id": 10,
	"title": "My list",
	"board_id": 1,
	"created_at": "2017-10-06T23:40:26.606Z",
	"updated_at": "2017-10-06T23:40:26.606Z",
	"position": 65535.0
}
```

### Error Response

If a board with the provided `board_id` doesn’t exist, an error will be returned with a 404 status code. If no title is provided, an error is returned with a 422 “Unprocessable Entity” status code.

## PUT/PATCH /api/lists/:id

Update a list.

### Controller#Action

`api/lists#update`

### Expected Payload

Any combination of `title` and `position` can be provided. The only requirement is that at least one must be provided.

```json
{
	"title": "Updated title",
	"position": 137882
}
```

### Successful Response

The list is returned in JSON form with a 200 status code.

#### Example Response

```json
{
	"id": 1,
	"title": "Updated title",
	"position": 137882.0,
	"board_id": 1,
	"created_at": "2017-10-04T05:57:07.222Z",
	"updated_at": "2017-10-06T23:48:44.540Z"
}
```

### Error Response

If a list with the provided `id` doesn’t exist, an error will be returned with a 404 status code. If no title or position is provided, an error is returned with a 422 “Unprocessable Entity” status code.

## POST /api/cards

Creates a card. This also generates a card action describing that the card was added to the given list.

### Controller#Action

`api/cards#create`

### Expected Payload

NOTE: The `list_id` where the card will reside is required.

```json
{
	"list_id": 13,
	"card": {
		"title": "My new card"
	}
}
```

### Successful Response

The new card is returned in JSON format with a 201 response status code.

#### Example Response

```json
{
	"id": 9,
	"title": "My new card",
	"description": "",
	"labels": [],
	"list_id": 13,
	"position": 65535.0,
	"archived": false,
	"created_at": "2017-10-08T17:54:55.285Z",
	"updated_at": "2017-10-08T17:54:55.285Z",
	"due_date": null,
	"completed": false,
	"board_id": 1,
	"comments_count": 0
}
```

### Error Response

If an invalid (or no) `list_id` is provided, an error will be returned with a 404 response status code. The only required field is the title. If no title (or a blank one) is provided, a 422 “Unprocessable Entity” status code will be returned along with an error describing the problem.

## GET /api/cards/:id

Retrieve the card with the given `id`.

### Controller#Action

`api/cards#show`

### Expected Payload

None

### Successful Response

The card is returned in JSON format. The JSON also includes the card’s comments and actions nested within the card object.

#### Example Response

```json
{
	"id": 9,
	"title": "My new card",
	"description": "",
	"labels": [],
	"list_id": 13,
	"position": 65535.0,
	"archived": false,
	"created_at": "2017-10-08T17:54:55.285Z",
	"updated_at": "2017-10-08T17:54:55.285Z",
	"due_date": null,
	"completed": false,
	"board_id": 1,
	"comments_count": 0,
	"comments": [],
	"actions": [
		{
			"id": 49,
			"description": " added this card to My list",
			"created_at": "2017-10-08T17:54:55.319Z",
			"updated_at": "2017-10-08T17:54:55.319Z",
			"card_id": 9
		}
	]
}
```

### Error Response

If no card exists with the given `id`, an error response will be returned with a 404 status code.

## PUT/PATCH /api/cards/:id

Update a card. This also generates card actions in the following situations:

- Due date was added
- Due date was removed
- Due date was changed
- Completion status was changed
- Card was moved to a different list
- Card was archived
- Card was sent back to the board from the archive

### Controller#Action

`api/cards#update `

### Expected Payload

At least one attribute must be included in a `"card"`object in the payload. The allowed attributes are:

- `title`
- `list_id`
- `position`
- `description`
- `archived`
- `due_date`
- `completed`
- `labels`

#### Example Payload

```json
{
	"card": {
		"title": "My updated title",
		"completed": true
	}
}
```

### Successful Response

The updated card will be returned in JSON format. The returned object also includes the card’s actions nested within the `card` object. That is because certain updates generate new actions which need to be displayed.

#### Example Response

```json
{
	"title": "My updated title",
	"completed": true,
	"list_id": 13,
	"due_date": null,
	"id": 9,
	"archived": false,
	"description": "",
	"labels": [],
	"position": 65535.0,
	"created_at": "2017-10-08T17:54:55.285Z",
	"updated_at": "2017-10-08T18:15:25.017Z",
	"board_id": 1,
	"comments_count": 0,
	"actions": [
		{
			"id": 50,
			"description": " marked the due date complete",
			"created_at": "2017-10-08T18:15:25.014Z",
			"updated_at": "2017-10-08T18:15:25.014Z",
			"card_id": 9
		},
		{
			"id": 49,
			"description": " added this card to My list",
			"created_at": "2017-10-08T17:54:55.319Z",
			"updated_at": "2017-10-08T17:54:55.319Z",
			"card_id": 9
		}
	]
}
```

### Error Response

If no card exists with the given `id`, a 404 status code is returned with an error. If an empty title is provided, or no attributes are provided, a 422 “Unprocessable Entity” status code is returned along with an error.

## POST /api/comments

Create a comment on a card.

### Controller#Action

`api/comments#create`

### Expected Payload

NOTE: The `card_id` where the comment will reside is required.

```json
{
	"card_id": 9,
	"comment": {
		"text": "This is my comment"
	}
}
```

### Successful Response

The new comment is returned in JSON format.

#### Example Response

```json
{
	"id": 3,
	"text": "This is my comment",
	"card_id": 9,
	"created_at": "2017-10-08T18:23:59.803Z",
	"updated_at": "2017-10-08T18:23:59.803Z"
}
```

### Error Response

If no card exists with the given `id`, a 404 status code will be returned with an error. If no `text` (or an empty one) is provided, a 422 “Unprocessable Entity” status code will be returned with an error.
