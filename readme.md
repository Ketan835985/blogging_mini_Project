# Project1 - Blogging_miniSite

A blogging site is an online platform that allows individuals or organizations to create and publish their own content in the form of blog posts. It serves as a medium for sharing information, knowledge, opinions, and experiences with a wide audience.

Blogging sites have gained immense popularity due to their ease of use, accessibility, and the ability to reach a global audience. They provide a platform for writers, professionals, enthusiasts, and experts to showcase their expertise, share their ideas, and engage with readers through interactive discussions.

## Blogging MiniSite  Project Requirement

This project aims to develop a Blogging Site with the following functionalities.

### Phase I

#### Models
- Author Model:
  - `fname` (mandatory)
  - `lname` (mandatory)
  - `title` (mandatory, enum[Mr, Mrs, Miss])
  - `email` (mandatory, valid email, unique)
  - `password` (mandatory)

- Blogs Model:
  - `title` (mandatory)
  - `body` (mandatory)
  - `authorId` (mandatory, references author model)
  - `tags` (array of strings)
  - `category` (string, mandatory)
  - `subcategory` (array of strings, examples[technology-[web development, mobile development, AI, ML etc]])
  - `createdAt`
  - `updatedAt`
  - `deletedAt` (when the document is deleted)
  - `isDeleted` (boolean, default: false)
  - `publishedAt` (when the blog is published)
  - `isPublished` (boolean, default: false)

#### Author APIs

- **POST /authors**

  Create an author document from the request body.

  Endpoint: `BASE_URL/authors`

  Example Request Body:
  ```json
  {
    "fname": "John",
    "lname": "Doe",
    "title": "Mr",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **POST /blogs**

  Create a blog document from the request body. Include `authorId` in the request body.

  Make sure the `authorId` is a valid `authorId` by checking if the author exists in the authors collection.

  Return HTTP status 201 on successful blog creation. Also, return the blog document. The response should be a JSON object.

  Example Request Body:
  ```json
  {
    "title": "Sample Blog",
    "body": "This is a sample blog",
    "authorId": "author123",
    "tags": ["sample", "blog"],
    "category": "Sample Category",
    "subcategory": ["Sample Subcategory"]
  }
  ```

- **GET /blogs**

  Return all blogs in the collection that are not deleted and are published.

  Return HTTP status 200 if any documents are found. The response structure should be an array of blogs.

  If no documents are found, then return an HTTP status 404 with an appropriate error message.

  Apply filters to the blogs list by using query parameters. The query parameters can have any combination of the below filters:
  - By author Id
  - By category
  - List of blogs that have a specific tag
  - List of blogs that have a specific subcategory

  Example Query URL: `BASE_URL/blogs?filtername=filtervalue&f2=fv2`

- **PUT /blogs/:blogId**

  Update a blog by changing its title, body, adding tags, and adding a subcategory. (Assuming the tag and subcategory received in the body need to be added)

  Update a blog by changing its publish status, i.e., add `publishedAt` date and set `isPublished` to true.

  Check if the `blogId` exists (must have `isDeleted` false). If it doesn't, return an HTTP status 404 with an appropriate error message.

  Return an HTTP status 200 if the blog is updated successfully. Also, include the updated blog document in the response.

- **DELETE /blogs/:blogId**

 

 Check if the `blogId` exists (and is not deleted). If it does, mark it as deleted and return an HTTP status 200 without any response body.

  If the blog document doesn't exist, return an HTTP status 404 with an appropriate error message.

- **DELETE /blogs?queryParams**

  Delete blog documents by category, authorId, tag name, subcategory name, or unpublished.

  If the blog document doesn't exist, return an HTTP status 404 with an appropriate error message.

### Phase II

- Add authentication and authorization features.

#### Authentication

- **POST /login**

  Allow an author to login with their email and password. On a successful login attempt, return a JWT token containing the authorId in the response body.

  If the credentials are incorrect, return a suitable error message with a valid HTTP status code.

  Example Request Body:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Authorization

- Add an authorization implementation for the JWT token that validates the token before every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code.

- Protected routes include creating a blog, editing a blog, getting the list of blogs, and deleting a blog(s).

- Set the token, once validated, in the request header as `x-api-key`.

- Use middleware for authentication purposes.

- Make sure that only the owner of the blogs is able to edit or delete the blog.

- In case of unauthorized access, return an appropriate error message.

## Testing (Self-evaluation During Development)

- To test these APIs, create a new collection in Postman named "Project 1 Blogging".

- Each API should have a new request in this collection.

- Each request in the collection should be appropriately named, such as "Create Author", "Create Blog", "Get Blogs", etc.

- Each member of each team should have their tests in a running state.

Refer to the sample image below for reference:

![A Postman collection and request sample](assets/Postman-collection-sample.png)

## Response Structures

### Successful Response Structure
```yaml
{
  "status": true,
  "data": {

  }
}
```

### Error Response Structure
```yaml
{
  "status": false,
  "message": ""
}
```

## Collections

### Author
```yaml
{
  "status": true,
  "data": {
    "_id": "63edd170875e5650d89ab9b8",
    "fname": "John",
    "lname": "Wick",
    "title": "Mr",
    "email": "john4614@gmail.com",
    "password": "pass1234",
    "createdAt": "2023-02-16T06:47:12.993Z",
    "updatedAt": "2023-02-16T06:47:12.993Z",
    "__v": 0
  }
}
```

### Blogs
```yaml
{
  "status": true,
  "data": {
    "title": "How to win friends",
    "body": "Blog body",
    "tags": ["Book", "Friends", "Self help"],
    "category": "Book",
    "subcategory": ["Non fiction", "Self Help"],
    "published": false,
    "publishedAt": "", // if published is true, publishedAt will have a date, e.g., 2021-09-17T04:25:07.803Z
    "deleted": false,
    "deletedAt": "", // if deleted is true, deletedAt will have a date, e