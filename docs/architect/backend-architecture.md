## Overview

This backend is a NestJS monolith using:
- HTTP + Express as the transport layer
- MongoDB via Mongoose for persistence
- Passport (Google OAuth2) for authentication
- Swagger for API documentation

The codebase is organized primarily by **feature** (domain) under `src/features`, plus shared configuration and utilities.

## Current High-Level Structure

- `src/main.ts`: Application bootstrap, CORS, global pipes, exception filters, Swagger setup.
- `src/app.module.ts`: Root module that wires configuration, database, and feature modules.
- `src/config`: Application configuration and exception filters.
- `src/features`: Domain-level feature modules (auth, contact, core, pages, plan, solutions, teams).
- `src/utils`: Cross-cutting utilities and middleware.
- `test`: E2E tests and Jest config.

## Recommended Folder Structure

Adopt a consistent, feature-first structure:

- `src/`
  - `config/`
  - `common/`
    - `dto/`
    - `filters/`
    - `interceptors/`
    - `pipes/`
    - `types/`
    - `utils/`
  - `features/`
    - `auth/`
      - `auth.module.ts`
      - `auth.controller.ts`
      - `auth.service.ts`
      - `strategies/`
      - `schemas/`
      - `dto/`
      - `types/`
    - `contact/`
      - `contact.module.ts`
      - `contact.controller.ts`
      - `contact.service.ts`
      - `dto/`
      - `schemas/`
      - `types/`
    - `core/`
      - `core.module.ts`
      - `core.controller.ts`
      - `core.service.ts`
      - `dto/`
      - `schemas/`
      - `utils/`
      - `types/`
    - `pages/`
      - `pages.module.ts`
      - `pages.controller.ts`
      - `pages.service.ts`
      - `dto/`
      - `schemas/`
      - `types/`
      - `_mock/`
    - `plan/`
      - `plan.module.ts`
      - `plan.controller.ts`
      - `plan.service.ts`
      - `dto/`
      - `schemas/`
      - `types/`
    - `solutions/`
      - `solutions.module.ts`
      - `solutions.controller.ts`
      - `solutions.service.ts`
      - `data/`
      - `types/`
    - `teams/`
      - `teams.module.ts`
      - `teams.controller.ts`
      - `teams.service.ts`
      - `data/`
      - `types/`
  - `utils/`
    - `middlewares/`
    - `logger/`

Over time, shared DTOs, types, and helpers should be extracted into the `common` layer instead of being duplicated under individual features.

## Module and Service Guidelines

- Keep each feature self-contained: module, controller, service, DTOs, schemas, and types live together.
- Prefer the singular `*.service.ts` naming convention to match NestJS style.
- Root module (`AppModule`) should:
  - Import `ConfigModule.forRoot({ isGlobal: true })`.
  - Configure database connections (`MongooseModule.forRoot`).
  - Import feature modules only; avoid providing feature services directly from `AppModule`.

## Controller Best Practices

- Keep controllers thin:
  - Perform request validation with DTOs and `class-validator`.
  - Delegate all business logic to services.
- Use explicit route prefixes and avoid duplicated paths.
- Group routes logically per resource and use consistent HTTP verbs:
  - `GET /resource` for retrieval
  - `POST /resource` for creation
  - `PATCH /resource/:id` for partial updates
  - `DELETE /resource/:id` for deletion

## Service and Data Access Guidelines

- Services should:
  - Contain business logic and coordinate with repositories or Mongoose models.
  - Remain stateless with respect to HTTP context.
- Repository/data-access patterns:
  - Use `@InjectModel` for Mongoose models inside services.
  - Keep raw Mongoose operations in a dedicated data-access layer if logic grows complex.

## Exception Handling and Validation

- Centralize exception handling with global filters:
  - One filter for HTTP exceptions
  - Optionally one for all uncaught exceptions
- Use global `ValidationPipe` with `transform` enabled for DTO validation.
- Avoid inline validation in controllers or services; instead rely on DTOs and pipes.

## Swagger and API Documentation

- Keep Swagger configuration centralized in `main.ts`.
- Use decorators like `@ApiTags`, `@ApiOperation`, and `@ApiResponse` on controllers and methods for public APIs.
- Tag endpoints by domain (`auth`, `contact`, `solutions`, `teams`, `pages`, `plan`) to match the existing setup.

## Testing Approach

- Co-locate unit tests with their targets or keep them under `test/`:
  - `*.spec.ts` for unit tests
  - `*.e2e-spec.ts` for end-to-end tests
- For feature modules:
  - Provide isolated unit tests for controllers and services.
  - Use `mongodb-memory-server` for integration tests involving the database.

## Evolution Plan

- Gradually:
  - Rename `*.services.ts` to `*.service.ts` to align with NestJS defaults.
  - Move cross-cutting utilities into `src/common`.
  - Migrate mock JSON data into database-backed entities or seed scripts.
  - Consolidate exception handling into a small number of well-defined global filters.

