# Task Management API Specification

## Base URL
```
https://api.taskmanager.app/v1
```

## Authentication
All API requests require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## Endpoints

### Authentication

#### POST `/auth/login`
Authenticate user and receive access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
  "user": {
    "id": "usr_123",
    "name": "Alex Johnson",
    "email": "user@example.com",
    "avatar": "https://cdn.taskmanager.app/avatars/usr_123.jpg"
  }
}
```

#### POST `/auth/refresh`
Refresh access token using refresh token.

---

### Tasks

#### GET `/tasks`
Retrieve all tasks for authenticated user.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `in_progress`, `in_review`, `on_hold`, `completed` |
| `priority` | string | Filter by priority: `low`, `medium`, `high` |
| `date` | string | Filter by date (ISO 8601 format) |
| `limit` | number | Number of results (default: 20) |
| `offset` | number | Pagination offset |

**Response:**
```json
{
  "tasks": [
    {
      "id": "task_456",
      "title": "Web application user registration process",
      "description": "Design and implement user registration flow",
      "start_time": "2026-01-12T10:00:00Z",
      "end_time": "2026-01-12T17:30:00Z",
      "priority": "high",
      "status": "in_review",
      "review_count": 6,
      "assigned_users": [
        {
          "id": "usr_123",
          "name": "Alex Johnson",
          "avatar": "https://cdn.taskmanager.app/avatars/usr_123.jpg"
        }
      ],
      "created_at": "2026-01-10T09:00:00Z",
      "updated_at": "2026-01-12T08:00:00Z"
    }
  ],
  "total": 15,
  "limit": 20,
  "offset": 0
}
```

#### POST `/tasks`
Create a new task.

**Request:**
```json
{
  "title": "Dashboard design for admin panel",
  "description": "Create main dashboard wireframes",
  "start_time": "2026-01-13T10:00:00Z",
  "end_time": "2026-01-13T17:30:00Z",
  "priority": "high",
  "assigned_user_ids": ["usr_123", "usr_124"]
}
```

#### PATCH `/tasks/:id`
Update an existing task.

**Request (partial update):**
```json
{
  "status": "completed",
  "priority": "medium"
}
```

#### DELETE `/tasks/:id`
Delete a task.

---

### Analytics

#### GET `/analytics`
Get productivity analytics data.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `period` | string | `day`, `week`, or `month` |
| `start_date` | string | Start date (ISO 8601) |
| `end_date` | string | End date (ISO 8601) |

**Response:**
```json
{
  "period": "week",
  "data": [
    {
      "date": "2026-01-05",
      "in_progress": 3,
      "in_review": 4,
      "on_hold": 2,
      "completed": 5
    }
  ],
  "summary": {
    "total_tasks": 45,
    "completion_rate": 0.78,
    "avg_tasks_per_day": 6.4
  }
}
```

---

### Meetings

#### GET `/meetings`
Get upcoming meetings.

#### POST `/meetings`
Schedule a new meeting.

---

## Data Models

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  start_time: string;  // ISO 8601
  end_time: string;    // ISO 8601
  priority: 'low' | 'medium' | 'high';
  status: 'in_progress' | 'in_review' | 'on_hold' | 'completed';
  assigned_users: User[];
  review_count: number;
  created_at: string;
  updated_at: string;
}
```

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
```

---

## Real-time Updates

WebSocket endpoint for live updates:
```
wss://api.taskmanager.app/ws
```

**Events:**
- `task.created` - New task created
- `task.updated` - Task status/details changed
- `task.deleted` - Task removed
- `analytics.refresh` - Analytics data updated
