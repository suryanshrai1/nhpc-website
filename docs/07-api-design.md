# API Specification

## NHPC Website Management System

Version: 1.0

---

# 1. Overview

The backend exposes REST APIs for two consumers:

- Public Website
- Admin Dashboard

All APIs are versioned and follow consistent request and response formats.

Base URL

```
/api/v1
```

---

# 2. API Structure

## Public APIs

```
/api/v1/public
```

Examples

```
GET    /homepage
GET    /projects
GET    /projects/:slug
GET    /news
GET    /news/:slug
GET    /tenders
GET    /careers
GET    /leadership
GET    /sustainability
GET    /investors
GET    /offices
POST   /contact
GET    /navigation
```

---

## Admin APIs

```
/api/v1/admin
```

Examples

```
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh

GET    /dashboard

CRUD for:

/projects
/news
/tenders
/careers
/leadership
/sustainability
/investors
/offices
/navigation
/homepage
/media
```

---

# 3. Authentication

Public APIs

- No authentication required.

Admin APIs

- JWT Access Token
- Refresh Token

Authorization Header

```
Authorization: Bearer <token>
```

---

# 4. Standard Response Format

## Success

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {},
  "meta": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "title",
      "message": "Title is required."
    }
  ]
}
```

---

# 5. Pagination

All listing APIs support:

```
?page=1
&limit=10
```

Response

```json
{
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 125,
    "total_pages": 13
  }
}
```

---

# 6. Searching

Supported by all listing APIs.

```
?search=solar
```

---

# 7. Filtering

Standard format

```
?filter[field]=value
```

Examples

```
?filter[state]=5

?filter[status]=2

?filter[type]=1

?filter[featured]=true
```

---

# 8. Sorting

```
?sort=name

?order=asc
```

---

# 9. Includes

Load related resources only when required.

Example

```
?include=location

?include=gallery

?include=specifications
```

---

# 10. HTTP Methods

| Method | Purpose |
|----------|----------|
| GET | Retrieve |
| POST | Create |
| PUT | Replace |
| PATCH | Partial Update |
| DELETE | Soft Delete |

---

# 11. Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

# 12. Public Endpoints

## Homepage

```
GET /homepage
```

---

## Projects

```
GET /projects
GET /projects/:slug
```

---

## News

```
GET /news
GET /news/:slug
```

---

## Tenders

```
GET /tenders
GET /tenders/:id
```

---

## Careers

```
GET /careers
GET /careers/:id

POST /careers/:id/apply
```

---

## Leadership

```
GET /leadership
```

---

## Sustainability

```
GET /sustainability
GET /sustainability/:slug
```

---

## Investor Relations

```
GET /investors

GET /investors/:id/download
```

---

## Offices

```
GET /offices
```

---

## Contact

```
POST /contact
```

---

## Navigation

```
GET /navigation
```

---

# 13. Admin Endpoints

Every business module exposes standard CRUD APIs.

Example

Projects

```
GET    /projects

GET    /projects/:id

POST   /projects

PUT    /projects/:id

PATCH  /projects/:id

DELETE /projects/:id
```

The same pattern applies to:

- Homepage
- News
- Tenders
- Careers
- Leadership
- Sustainability
- Investor Documents
- Offices
- Navigation
- Media

---

# 14. Dashboard APIs

```
GET /dashboard
```

Returns

- Total Projects
- Active Tenders
- Published News
- Career Openings
- Total Media Files
- Recent Activities

---

# 15. Media APIs

```
POST   /media

GET    /media

GET    /media/:id

DELETE /media/:id
```

Media upload returns a media identifier which is later associated with entities using the database relationships.

---

# 16. Soft Delete

DELETE requests never permanently remove records.

Instead, records are marked using

```
deleted_at
```

Public APIs never return deleted records.

---

# 17. Validation

All incoming requests are validated before reaching business logic.

Validation includes:

- Required fields
- Data types
- Length limits
- Date validation
- Foreign key validation
- File validation

---

# 18. Security

- JWT Authentication
- Password hashing
- Request validation
- Parameterized database queries
- File upload validation
- Protected admin routes

---

# 19. API Design Principles

- RESTful resource naming
- Versioned APIs
- Consistent response format
- Soft deletion
- Standard pagination
- Search, filtering and sorting support
- Generic media management
- Modular endpoints
- UTC timestamps
- JSON communication

---

# 20. API Modules Summary

| Module | Public | Admin |
|----------|:------:|:------:|
| Authentication | ❌ | ✅ |
| Homepage | ✅ | ✅ |
| Projects | ✅ | ✅ |
| News | ✅ | ✅ |
| Tenders | ✅ | ✅ |
| Careers | ✅ | ✅ |
| Leadership | ✅ | ✅ |
| Sustainability | ✅ | ✅ |
| Investor Relations | ✅ | ✅ |
| Offices | ✅ | ✅ |
| Contact | ✅ | ✅ |
| Navigation | ✅ | ✅ |
| Media | ❌ | ✅ |
| Dashboard | ❌ | ✅ |

---

# Final Notes

The API follows a modular REST architecture where each business module exposes a consistent CRUD interface. Public endpoints provide read-only access to published content, while administrative endpoints support authenticated content management. The API is designed to integrate seamlessly with the PostgreSQL database, Prisma ORM, Express.js backend and React-based public website and admin dashboard.