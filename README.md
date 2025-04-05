# WebTechPie Backend
The official backend for [WebTechPie](https://webtechpie.com) is a robust NestJS backend application that provides RESTful APIs for authentication, contact management, testimonials, and more.

## Development

### Prerequisites

- Node.js (>= 22.14.0)
- Yarn
- MongoDB (local or remote instance)
- Google OAuth credentials (for authentication)
- VS Code (recommended)

### Installation

```bash
git clone https://github.com/webtechpie-be/backend.git
yarn install
```

Copy the `.env.example` file and rename it to `.env`, then update it with your configuration:

Run the application in development mode:

```
yarn start:dev
```

The application will be available at http://localhost:8080 (or the port specified in your .env file).

## Build

```
yarn build
```

## API Documentation

Swagger/OpenAPI documentation is available at:

```bash
http://localhost:8080/docs
```

This provides a Swagger UI interface where you can explore and test all available endpoints.

## Release Strategy:

The release strategy is currently being planned. Stay tuned for updates.

- Prod API URL:
```https://app-webtechpie-be.adaptable.app/api/v1```

- Server: adaptable app

- Plan: Free

- Domain: app-webtechpie-be.adaptable.app

## Contributing

1. Fork the repository
2. Create a feature branch (```git checkout -b feature/your-feature ```)
3. Commit your changes (```git commit -m 'Add your feature'```)
4. Push to the branch (```git push origin feature/your-feature```)
5. Open a Pull Request
