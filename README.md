
# Wiki-API

A RESTFul-API for wikipedia of Computer Science.
 Functionalities - `GET, POST, DELETE, PUT & PATCH`.
 Articles and sub-articles are stored in MongoDB
database, back-end operations are performed using
Mongoose.

[[ Live Preview ](https://wiki-api-vijay-cpp.herokuapp.com/)]

## API Reference

#### Get all articles

```http
  GET /articles
```

#### Get specific item

```http
  GET /articles/${article-name}
```

| Parameter      | Type     | Description                       |
| :--------      | :------- | :-------------------------------- |
| `article-name` | `string` | **Required**. Id of item to fetch |


#### Post articles

```http
  POST /articles
```

| Parameter      | Type     | Description                       |
| :--------      | :------- | :-------------------------------- |
| `title`        | `string` | Name for form input |
| `content`      | `string` | Name for form input |

