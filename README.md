
# Product Management Backend API

This is a simple api that validates user via JWT http-only cookie. The user then allowed to perform CRUD operation on products. (Additionally the api can handle user logout too)


## API Reference

#### Login

```http
  POST /api/v1/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required**

#### Logout

```http
  POST /api/v1/auth/logout
```

#### Get All Products

```http
  POST /api/v1/products/all
```
#### Get All Products

```http
  POST /api/v1/products/create
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `category` | `string` | **Required**|
| `price` | `string` | **Required (Default 0)**|
| `stock` | `string` | **Required (Default 0)**|
| `totalSold` | `string` | **Required (Default 0)**|
| `totalViews` | `string` | **Required (Default 0)**|
| `ratingAvg` | `string` | **Required (Default 0)**|
| `status` | `string ('active', 'inactive', 'archived')` | **Required**|


#### Get All Products

```http
  PUT /api/v1/products/update/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Optonal** |
| `category` | `string` | **Optonal**|
| `price` | `string` | **Optonal**|
| `stock` | `string` | **Optonal**|
| `totalSold` | `string` | **Optonal**|
| `totalViews` | `string` | **Optonal**|
| `ratingAvg` | `string` | **Optonal**|
| `status` | `string ('active', 'inactive', 'archived')` | **Optonal**|

```http
  DELETE /api/v1/products/delete/:id
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/VoidAshfak/product-dashboard-backend.git
```

Go to the project directory

```bash
  cd product-dashboard-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Deployment

To deploy this project run

```bash
  npm run build
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CORS_ORIGIN_PRIMARY`

`CORS_ORIGIN_SECONDARY`

`FIRESTORE_PROJECT_ID`

`FIREBASE_ACCOUNT_TYPE`

`FIREBASE_ACCOUNT_PROJECTID`

`FIREBASE_ACCOUNT_PRIVATE_KEY_ID`

`FIREBASE_ACCOUNT_PRIVATE_KEY`

`FIREBASE_ACCOUNT_PRIVATE_KEY`

`FIREBASE_ACCOUNT_CLIENT_EMAIL`

`FIREBASE_ACCOUNT_CLIENT_ID`

`FIREBASE_ACCOUNT_AUTH_URI`

`FIREBASE_ACCOUNT_TOKEN_URI`

`FIREBASE_ACCOUNT_AUTH_PROVIDER_CERT_URL`

`FIREBASE_ACCOUNT_CLIENT_CERT_URL`

`FIREBASE_ACCOUNT_UNIVERSE_DOMAIN`

`ACCESS_TOKEN_SECRET`


## Tech Stack

**Server:** Node, Express, Firebase Firestore, Typescript, JWT


## Demo

https://product-dashboard-backend-d94y.onrender.com/

