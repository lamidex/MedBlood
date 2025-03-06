# 🩸 MedBlood

## 📋 Overview
MedBlood is a RESTful API service built with Node.js for managing blood donation applications. The application provides user authentication and blood sample management functionality through secure endpoints.

## ✨ Features
- 🔐 User authentication (signup/login)
- 🎫 JWT-based authorization
- 🩸 Blood donation application management
- ⚡ CRUD operations for blood samples
- 🔒 Secure password hashing
- ⚙️ Environment variable configuration
- 🗄️ Database connection handling

## 🛠️ Tech Stack
| Category | Technology |
|----------|------------|
| Backend Runtime | Node.js |
| Web Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Token (JWT) |
| Password Hashing | bcrypt.js |
| Configuration | dotenv |
| Logging | Morgan |

## 📁 Project Structure
```
MedBlood/
├── src/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── blood.controller.js   # Blood donation logic
│   │   └── user.controller.js    # User authentication logic
│   ├── middleware/
│   │   └── isAuthenticated.js    # JWT verification middleware
│   ├── models/
│   │   ├── blood.model.js       # Blood donation schema
│   │   └── user.model.js        # User schema
│   └── routes/
│       ├── blood.routes.js      # Blood donation endpoints
│       └── user.routes.js       # Authentication endpoints
├── .env                         # Environment variables
├── .gitignore
├── index.js                     # Application entry point
├── package.json
└── README.md
```

## 📚 API Documentation

### 🔐 Authentication Endpoints

#### 1. User Signup
- **Endpoint**: `POST /api/v1/signup`
- **Description**: Register a new user
- **Request Body**:
```json
{
    "userName": "string",
    "password": "string"
}
```
- **Response**: 
```json
{
    "message": "User created successfully",
    "data": {
        "userName": "string",
        "id": "string"
    }
}
```

#### 2. User Login
- **Endpoint**: `POST /api/v1/login`
- **Description**: Authenticate user and get JWT token
- **Request Body**:
```json
{
    "userName": "string",
    "password": "string"
}
```
- **Response**:
```json
{
    "message": "Logged in successfully",
    "token": "JWT_TOKEN"
}
```

### 🩸 Blood Donation Endpoints

#### 1. Submit Blood Sample
- **Endpoint**: `POST /api/v1/saveBloodsamples`
- **Authentication**: Required
- **Request Body**:
```json
{
    "bloodGroup": "string",
    "rhesusFactor": "string",
    "address": "string"
}
```
- **Response**:
```json
{
    "message": "Blood sample Application Submitted Successfully"
}
```

#### 2. Get All Applications
- **Endpoint**: `GET /api/v1/getAllApplications`
- **Authentication**: Required
- **Response**:
```json
{
    "data": [
        {
            "bloodGroup": "string",
            "rhesusFactor": "string",
            "address": "string",
            "id": "string"
        }
    ],
    "length": "number"
}
```

#### 3. Update Application
- **Endpoint**: `PUT /api/v1/updateApplicationForm/:id`
- **Authentication**: Required
- **Request Body**:
```json
{
    "bloodGroup": "string",
    "rhesusFactor": "string",
    "address": "string"
}
```
- **Response**:
```json
{
    "message": "Blood Application updated successfully.",
    "data": {
        "updated_application_details"
    }
}
```

#### 4. Delete Application
- **Endpoint**: `DELETE /api/v1/deleteApplication/:id`
- **Authentication**: Required
- **Response**:
```json
{
    "message": "Blood sample deleted successfully"
}
```

## 🚀 Setup Instructions

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/medblood.git
cd medblood
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
Create `.env` file in root directory:
```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/medblood
JWT_SECRET=your_secure_jwt_secret
```

4. **Start Application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔒 Security Features
- 🔑 Password hashing using bcrypt
- 🎫 JWT-based authentication
- 🛡️ Protected routes using middleware
- ⚙️ Environment variable configuration
- ✅ Input validation

## ❌ Error Handling
The API implements proper error handling for:
- 🚫 Invalid requests
- 🔒 Authentication errors
- 🗄️ Database operation failures
- ✅ Validation errors

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request
