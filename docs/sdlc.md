# SDLC Artifacts

## Epic 1

Objective: allow users to record, manage, search, filter, and analyze daily food consumption.

## Acceptance Criteria

- Users can register, log in, log out, and view profile details.
- Authenticated users can create, view, update, soft delete, search, filter, sort, and paginate food logs.
- Food logs support predefined and custom tags.
- Food logs support one optional jpg, jpeg, or png image up to 5 MB.
- Analytics expose weekly trend, monthly trend, lowest calorie day, lowest calorie week, and meal distribution.
- Dashboard exposes today calories, weekly calories, total logs, streak, recent entries, and rule-based insights.

## Non-Functional Requirements

- Passwords are hashed with bcrypt.
- JWT protects private APIs.
- Prisma manages PostgreSQL schema and relationships.
- Validation and consistent error responses are applied at API boundaries.
- Docker Compose runs the application stack locally.
