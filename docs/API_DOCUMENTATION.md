# API Documentation - Yogic Hours

## Base URL

```
http://localhost:3000/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. User Registration

**POST** `/auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "accessToken": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

### 2. User Login

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "accessToken": "jwt_token_here",
    "refreshToken": "refresh_token_here",
    "expiresIn": 86400
  }
}
```

### 3. User Logout

**POST** `/auth/logout`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Logged out successfully"
}
```

### 4. Verify Token

**GET** `/auth/verify`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "valid": true,
    "userId": "user_123"
  }
}
```

---

## Booking Endpoints

### 1. Get All Bookings

**GET** `/bookings`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (pending, confirmed, completed, cancelled)

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "booking_123",
        "userId": "user_123",
        "serviceId": "service_456",
        "instructorId": "instructor_789",
        "startDate": "2024-06-01T10:00:00Z",
        "endDate": "2024-06-01T11:00:00Z",
        "status": "confirmed"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 2. Create Booking

**POST** `/bookings`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "serviceId": "service_456",
  "instructorId": "instructor_789",
  "startDate": "2024-06-01T10:00:00Z",
  "endDate": "2024-06-01T11:00:00Z"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "id": "booking_123",
    "userId": "user_123",
    "serviceId": "service_456",
    "instructorId": "instructor_789",
    "startDate": "2024-06-01T10:00:00Z",
    "endDate": "2024-06-01T11:00:00Z",
    "status": "pending"
  }
}
```

### 3. Get Booking Details

**GET** `/bookings/{bookingId}`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "booking_123",
    "userId": "user_123",
    "serviceId": "service_456",
    "instructorId": "instructor_789",
    "startDate": "2024-06-01T10:00:00Z",
    "endDate": "2024-06-01T11:00:00Z",
    "status": "confirmed"
  }
}
```

### 4. Cancel Booking

**POST** `/bookings/{bookingId}/cancel`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "booking_123",
    "status": "cancelled"
  }
}
```

---

## Payment Endpoints

### 1. Create Payment

**POST** `/payments`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "bookingId": "booking_123",
  "amount": 500,
  "currency": "INR",
  "method": "upi"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "id": "payment_123",
    "bookingId": "booking_123",
    "amount": 500,
    "currency": "INR",
    "status": "pending",
    "method": "upi",
    "razorpayId": "pay_12345xyz"
  }
}
```

### 2. Verify Payment

**POST** `/payments/verify`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "paymentId": "payment_123",
  "razorpayPaymentId": "pay_12345xyz",
  "razorpayOrderId": "order_12345xyz",
  "razorpaySignature": "signature_here"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "payment_123",
    "status": "completed",
    "verified": true
  }
}
```

### 3. Get Payment Details

**GET** `/payments/{paymentId}`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "payment_123",
    "bookingId": "booking_123",
    "amount": 500,
    "currency": "INR",
    "status": "completed",
    "method": "upi"
  }
}
```

---

## Health Intake Form Endpoints

### 1. Submit Health Form

**POST** `/health-intake`

**Headers:**

```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**

```json
{
  "healthProblems": ["Back Pain", "Anxiety"],
  "stressLevel": 7,
  "bpHistory": "120/80",
  "goals": ["Reduce stress", "Improve flexibility"],
  "lifestyleHabits": {
    "sleepHours": 7,
    "exerciseFrequency": "3 times per week",
    "diet": "Vegetarian",
    "waterIntake": 2
  },
  "fileUpload": "medical_report.pdf"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "id": "form_123",
    "userId": "user_123",
    "healthProblems": ["Back Pain", "Anxiety"],
    "stressLevel": 7,
    "status": "submitted"
  }
}
```

### 2. Get Health Form

**GET** `/health-intake`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "form_123",
    "userId": "user_123",
    "healthProblems": ["Back Pain", "Anxiety"],
    "stressLevel": 7,
    "bpHistory": "120/80",
    "goals": ["Reduce stress", "Improve flexibility"],
    "lifestyleHabits": {
      "sleepHours": 7,
      "exerciseFrequency": "3 times per week",
      "diet": "Vegetarian",
      "waterIntake": 2
    }
  }
}
```

### 3. Update Health Form

**PUT** `/health-intake`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:** (same as submit)

**Response:** (same as submit)

---

## Inquiry Endpoints

### 1. Create Inquiry

**POST** `/inquiries`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Class Inquiry",
  "message": "I would like to know more about your online classes."
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "id": "inquiry_123",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Class Inquiry",
    "status": "new"
  }
}
```

---

## Blog Endpoints

### 1. Get Blog Posts

**GET** `/blog`

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `search` (optional): Search in title and content

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "blog_123",
        "title": "10 Benefits of Yoga",
        "slug": "10-benefits-of-yoga",
        "excerpt": "Discover the amazing benefits...",
        "category": "yoga_tips",
        "author": "John Instructor",
        "coverImage": "/images/yoga-benefits.jpg",
        "createdAt": "2024-05-01T10:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 2. Get Blog Post

**GET** `/blog/{slug}`

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "blog_123",
    "title": "10 Benefits of Yoga",
    "slug": "10-benefits-of-yoga",
    "content": "Full markdown content here...",
    "excerpt": "Discover the amazing benefits...",
    "category": "yoga_tips",
    "author": "John Instructor",
    "coverImage": "/images/yoga-benefits.jpg",
    "seoTitle": "10 Benefits of Yoga - Yogic Hours",
    "seoDescription": "Learn about the amazing health benefits of regular yoga practice...",
    "keywords": ["yoga", "health", "wellness"],
    "createdAt": "2024-05-01T10:00:00Z",
    "updatedAt": "2024-05-15T15:30:00Z"
  }
}
```

---

## Error Responses

### Standard Error Format

```json
{
  "success": false,
  "statusCode": 400,
  "error": "Validation Error",
  "message": "Invalid email format"
}
```

### Common Error Codes

| Status Code | Meaning                                  |
| ----------- | ---------------------------------------- |
| 400         | Bad Request - Invalid input              |
| 401         | Unauthorized - Missing or invalid token  |
| 403         | Forbidden - Not allowed to access        |
| 404         | Not Found - Resource doesn't exist       |
| 409         | Conflict - Resource already exists       |
| 422         | Unprocessable Entity - Validation failed |
| 500         | Internal Server Error                    |

---

## Rate Limiting

API endpoints are rate-limited to 100 requests per 15 minutes per IP address.

**Headers:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1621234567
```

---

## Testing Endpoints

### Health Check

**GET** `/health`

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "status": "ok"
  }
}
```

---

## Webhook Events

### Payment Success

```json
{
  "event": "payment.success",
  "data": {
    "paymentId": "payment_123",
    "bookingId": "booking_123",
    "amount": 500,
    "timestamp": "2024-05-20T10:00:00Z"
  }
}
```

### Booking Confirmation

```json
{
  "event": "booking.confirmed",
  "data": {
    "bookingId": "booking_123",
    "userId": "user_123",
    "serviceId": "service_456",
    "timestamp": "2024-05-20T10:00:00Z"
  }
}
```

---

## SDK/Client Libraries

Coming soon:

- JavaScript SDK
- Python SDK
- Mobile SDKs

---

## Version History

### v1.0 (Current)

- Initial API release
- Authentication, Bookings, Payments
- Health forms, Blog, Inquiries

---

**Last Updated**: 2024
**API Version**: 1.0
