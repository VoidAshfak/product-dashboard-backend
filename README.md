
---

# **Backend README.md (Final Version with Installation Guide)**

```md
# Real-Time Product Management Dashboard – Backend

This is the **backend** of the Real-Time Product Management Dashboard.  
It is built using **Node.js, Express.js, TypeScript**, and **Firebase Firestore (Admin SDK)**.

It provides:
- Authentication using **JWT + HTTP-only cookies**
- Product CRUD API connected to Firestore
- Secure route protection middleware

---

#  Features (Full API reference to be published...)

###  Authentication
- `POST /api/v1/auth/login`
- Hard-coded demo credentials
- Generates JWT and sets it in HTTP-only cookie
- Middleware protects private routes

- `POST /api/v1/auth/logout`
- clears cookies and logs user out

- `POST /api/v1/auth/me`
- maintain state across page refresh (not used  )

###  Product API (Firestore CRUD)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products/all` | Get all products |
| POST | `/api/v1/products/create` | Add product |
| PUT | `/api/v1/products/update/:id` | Update product |
| DELETE | `/api/v1/products/delete/:id` | Delete product |

# Installation Guide (Full Setup)
 - Clone the Repository
- run "git clone https://github.com/yourusername/your-backend-repo.git"
- run "cd your-backend-repo"
- Install deps 'npm install'


# Setup environment variables

-- for dev run "npm run dev"
-- for production "npm run build"
then "npm start"
