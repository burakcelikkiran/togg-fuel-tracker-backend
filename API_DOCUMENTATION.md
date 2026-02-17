# Front-End API Dokümantasyonu

## Base URL
```
http://togg-fuel-tracker-backend.test/api
```

## Authentication

### Token Type: Bearer Token (Sanctum)

```javascript
// Request Headers
Authorization: Bearer {token}
```

---

# 1. Auth Endpoints

## 1.1 Register
```http
POST /api/register
```

**Request:**
```json
{
  "name": "Burak Çelikkıran",
  "email": "burak@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response (201):**
```json
{
  "message": "Kayıt başarılı. Lütfen e-posta adresinize gönderilen doğrulama kodunu girin.",
  "customer_id": 1
}
```

---

## 1.2 Verify Email
```http
POST /api/verify
```

**Request:**
```json
{
  "customer_id": 1,
  "code": "123456"
}
```

**Response (200):**
```json
{
  "message": "E-posta başarıyla doğrulandı.",
  "token": "1|abc123...",
  "customer": {
    "id": 1,
    "name": "Burak Çelikkıran",
    "email": "burak@example.com",
    "email_verified_at": "2026-02-16T17:36:42.000000Z",
    "created_at": "2026-02-16T17:36:42.000000Z",
    "updated_at": "2026-02-16T17:36:42.000000Z"
  }
}
```

---

## 1.3 Login
```http
POST /api/login
```

**Request:**
```json
{
  "email": "burak@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "1|abc123...",
  "customer": {
    "id": 1,
    "name": "Burak Çelikkıran",
    "email": "burak@example.com",
    "email_verified_at": null,
    "created_at": "2026-02-16T17:36:42.000000Z",
    "updated_at": "2026-02-16T17:36:42.000000Z"
  }
}
```

---

## 1.4 Resend Code
```http
POST /api/resend-code
```

**Request:**
```json
{
  "customer_id": 1
}
```

**Response (200):**
```json
{
  "message": "Yeni doğrulama kodu e-posta adresinize gönderildi."
}
```

---

## 1.5 Logout
```http
POST /api/logout
```
**Auth:** Required

**Response (200):**
```json
{
  "message": "Çıkış başarılı"
}
```

---

## 1.6 Get Current User
```http
GET /api/user
```
**Auth:** Required

**Response (200):**
```json
{
  "id": 1,
  "name": "Burak Çelikkıran",
  "email": "burak@example.com",
  "email_verified_at": null,
  "created_at": "2026-02-16T17:36:42.000000Z",
  "updated_at": "2026-02-16T17:36:42.000000Z"
}
```

---

# 2. Vehicle Endpoints

## 2.1 Get All Vehicles
```http
GET /api/vehicles
```
**Auth:** Required

**Response (200):**
```json
[
  {
    "id": 1,
    "customer_id": 1,
    "name": "Togg T10G",
    "brand": "Togg",
    "model": "T10G",
    "plate": "35 TOG 001",
    "battery_capacity": "88.00",
    "year": 2024,
    "kilometer": 15000,
    "is_active": true,
    "created_at": "2026-02-16T17:36:42.000000Z",
    "updated_at": "2026-02-16T17:36:42.000000Z"
  }
]
```

---

## 2.2 Create Vehicle
```http
POST /api/vehicles
```
**Auth:** Required

**Request:**
```json
{
  "name": "Tesla Model Y",
  "brand": "Tesla",
  "model": "Model Y",
  "plate": "34 XYZ 789",
  "battery_capacity": 81.0,
  "year": 2023,
  "kilometer": 25000
}
```

**Response (201):** (Same as Get All Vehicles)

---

## 2.3 Update Vehicle
```http
PUT /api/vehicles/{id}
```
**Auth:** Required

**Request:** (Same as Create)

**Response (200):** (Same as Get All Vehicles)

---

## 2.4 Delete Vehicle
```http
DELETE /api/vehicles/{id}
```
**Auth:** Required

**Response (200):**
```json
{
  "message": "Vehicle deleted"
}
```

---

## 2.5 Set Active Vehicle
```http
POST /api/vehicles/{id}/set-current
```
**Auth:** Required

**Response (200):**
```json
{
  "id": 1,
  "is_active": true,
  ...
}
```

---

# 3. Charge Endpoints

## 3.1 Get Charges
```http
GET /api/charges
```
**Auth:** Required

**Query Parameters:**
- `company` (optional) - Filter by company name
- `start_date` (optional) - YYYY-MM-DD format
- `end_date` (optional) - YYYY-MM-DD format

**Response (200):**
```json
[
  {
    "id": 1,
    "date": "2026-02-10",
    "company": "ZES",
    "kwh": 45.5,
    "amount": 350.0,
    "unit_price": 7.69,
    "charge_type": "DC",
    "charge_percentage": 55
  }
]
```

---

## 3.2 Create Charge
```http
POST /api/charges
```
**Auth:** Required

**Request:**
```json
{
  "date": "2026-02-16",
  "company": "ZES",
  "kwh": 45.5,
  "amount": 350.0,
  "charge_type": "DC",
  "charge_percentage": 55
}
```

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| date | string | Yes | YYYY-MM-DD |
| company | string | Yes | max:255 |
| kwh | number | Yes | min:0 |
| amount | number | Yes | min:0 |
| charge_type | string | No | AC, DC |
| charge_percentage | integer | No | 0-100 |

**Response (201):**
```json
{
  "id": 1,
  "customer_id": 1,
  "vehicle_id": 1,
  "company_id": 1,
  "custom_company": null,
  "date": "2026-02-16",
  "kwh": "45.50",
  "amount": "350.00",
  "charge_type": "DC",
  "charge_percentage": 55,
  "created_at": "2026-02-16T17:36:42.000000Z",
  "updated_at": "2026-02-16T17:36:42.000000Z",
  "company": {
    "id": 1,
    "name": "ZES",
    "slug": "zes",
    "is_active": true
  }
}
```

---

## 3.3 Update Charge
```http
PUT /api/charges/{id}
```
**Auth:** Required

**Request:** (Same as Create)

**Response (200):** (Same as Create)

---

## 3.4 Delete Charge
```http
DELETE /api/charges/{id}
```
**Auth:** Required

**Response (200):**
```json
{
  "message": "Charge deleted"
}
```

---

# 4. Dashboard Endpoints

## 4.1 Get Dashboard Stats
```http
GET /api/dashboard
```
**Auth:** Required

**Response (200):**
```json
{
  "total_amount": 3210.5,
  "total_kwh": 415.5,
  "avg_unit_price": 7.73,
  "total_charges": 10,
  "monthly_trend": [
    {"month": "2026-01", "amount": 1250.0},
    {"month": "2026-02", "amount": 1960.5}
  ],
  "company_distribution": [
    {"company": "ZES", "amount": 1250.0},
    {"company": "ESarj", "amount": 960.5}
  ],
  "recent_charges": [
    {
      "id": 10,
      "date": "2026-02-16",
      "company": "Ofis Şarj İstasyonu",
      "kwh": 50.0,
      "amount": 350.0
    }
  ]
}
```

---

# 5. Report Endpoints

## 5.1 Get Reports
```http
GET /api/reports
```
**Auth:** Required

**Response (200):**
```json
{
  "monthly_trend": [
    {"month": "2026-01", "amount": 1250.0},
    {"month": "2026-02", "amount": 1960.5}
  ],
  "company_distribution": [
    {"company": "ZES", "amount": 1250.0},
    {"company": "ESarj", "amount": 960.5}
  ],
  "company_avg_price": [
    {"company": "ZES", "avg_price": 7.5},
    {"company": "ESarj", "avg_price": 8.2}
  ]
}
```

---

# 6. Company Endpoints

## 6.1 Get All Companies
```http
GET /api/companies
```
**Auth:** Required

**Response (200):**
```json
[
  "ZES",
  "ESarj",
  "Trugo",
  "Tesla Supercharger",
  "Aşır",
  "Sarjağı",
  "Ofis Şarj İstasyonu"
]
```

---

# Error Responses

## Format
```json
{
  "message": "Hata açıklaması"
}
```

## Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

# Data Types

| Type | Format |
|------|--------|
| string | Text |
| integer | Whole number |
| float | Decimal number |
| boolean | true/false |
| date | YYYY-MM-DD |
| datetime | ISO 8601 |

---

# Front-End Usage Example

```javascript
// API Base
const API = 'http://togg-fuel-tracker-backend.test/api';

// Login
const login = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
};

// Get Vehicles (with token)
const getVehicles = async (token) => {
  const res = await fetch(`${API}/vehicles`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return await res.json();
};

// Create Charge
const createCharge = async (token, data) => {
  const res = await fetch(`${API}/charges`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await res.json();
};
```
