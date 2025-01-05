
# 📋 KAM Lead Management System API

A comprehensive API designed to streamline the lead management process for Key Account Managers (KAMs). The system helps manage leads, track interactions, handle orders, and manage Points of Contact (POCs) efficiently.

---

## 🛠️ **Project Setup**

### **Technologies Used:**
- Node.js
- Express.js
- MongoDB
- Swagger UI for API documentation
- JWT for authentication
- Multer for file uploads

---

## 🚀 **How to Run the Project Locally**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/shalinibharti22/KAM.git
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Setup Environment Variables**

Create a `.env` file in the root of your project and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Run the Server**
```bash
npm start
```

The server will be running at `http://localhost:5000`.

---

## 🧪 **Deployed API URL**

The API is deployed on **Render**:  
👉 [https://kam-1-6yc0.onrender.com](https://kam-1-6yc0.onrender.com)

---

## 📖 **API Documentation (Swagger)**

Access the Swagger UI at:  
👉 [https://kam-1-6yc0.onrender.com/api-docs](https://kam-1-6yc0.onrender.com/api-docs)

---

## 🔐 **Authentication Endpoints**

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/auth/register`  | Register a new user    |
| POST   | `/auth/login`     | Login a user           |

---

## 📋 **Leads Management**

| Method | Endpoint                | Description                           |
|--------|-------------------------|---------------------------------------|
| POST   | `/api/leads`            | Create a new lead with file upload    |
| GET    | `/api/leads`            | Get all leads                         |
| PUT    | `/api/leads/{id}/status`| Update lead status                    |
| PUT    | `/api/leads/{id}/assign`| Assign a lead to a KAM                |
| GET    | `/api/leads/{id}/calls` | Get call history of a specific lead   |

---

## 📦 **Orders Management**

| Method | Endpoint                    | Description                           |
|--------|-----------------------------|---------------------------------------|
| POST   | `/api/orders`               | Add a new order                       |
| GET    | `/api/orders/{restaurant_id}`| Get all orders for a specific restaurant |

---

## 📞 **Points of Contact (POCs) Management**

| Method | Endpoint                   | Description                             |
|--------|----------------------------|-----------------------------------------|
| POST   | `/api/pocs`                | Add a new POC for a restaurant          |
| GET    | `/api/pocs/{restaurant_id}` | Get all POCs for a specific restaurant  |
| GET    | `/api/pocs/{poc_id}`        | Get a specific POC by ID                |
| PUT    | `/api/pocs/{poc_id}`        | Update contact details of a specific POC|
| DELETE | `/api/pocs/{poc_id}`        | Delete a specific POC                   |

---

## 🍽️ **Restaurant Management**

| Method | Endpoint                     | Description                |
|--------|------------------------------|----------------------------|
| POST   | `/api/restaurants`           | Add a new restaurant        |
| GET    | `/api/restaurants/{restaurant_id}` | Get a restaurant by ID      |

---

## 🛠️ **Features Implemented**

### ✅ **Authentication & Authorization:**
- JWT-based authentication.
- Role-based access control for Admin, KAM, and Viewer roles.

### ✅ **Leads Management:**
- CRUD operations on leads.
- Assign leads to KAMs.
- File uploads for lead details.

### ✅ **Order Tracking:**
- Create and view orders by restaurant.

### ✅ **POC Management:**
- Manage Points of Contact for each restaurant.

### ✅ **Interaction Tracking:**
- Record and retrieve interactions with leads.

---

## ⚙️ **Project Structure**

```bash
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── swagger.js
├── .env
├── package.json
└── README.md
```

---

## ⚡ **How to Update Swagger Documentation**

Swagger documentation is automatically generated from the route files.

1. Update your route files inside the `./routes/` folder.
2. Ensure your endpoints are properly commented with Swagger annotations.
3. Swagger UI will update dynamically based on your route definitions.

---

## 📝 **License**

This project is licensed under the MIT License.

---

## 🤝 **Contributions**

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📧 **Contact**

If you have any questions, feel free to reach out to:  
**Name:** Shalini Bharti  

