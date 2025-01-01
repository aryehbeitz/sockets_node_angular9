# WebSocket Chat Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) and upgraded to Angular 16.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Angular CLI 16.x

## Installation

```bash
# Install dependencies
yarn install
```

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `yarn ng generate component component-name` to generate a new component. You can also use `yarn ng generate directive|pipe|service|class|guard|interface|enum|module`.

Available generators:
- `component`
- `directive`
- `pipe`
- `service`
- `class`
- `guard`
- `interface`
- `enum`
- `module`
- `resolver`
- `interceptor`

## Build

```bash
# Development build
yarn build

# Production build
yarn build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Running unit tests

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test --code-coverage
```

Tests are executed via [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io/).

## Code Quality

```bash
# Run linting
yarn lint
```

## Project Structure

```
src/
├── app/                    # Application source code
│   ├── models/            # Data models and interfaces
│   ├── services/          # Angular services
│   └── components/        # Angular components
├── assets/                # Static assets
└── environments/          # Environment configurations
```

## WebSocket Features

This client implements a WebSocket connection for real-time chat functionality:
- Automatic reconnection on connection loss
- Error handling with retry mechanism
- Type-safe message handling

## Environment Configuration

The application uses environment files for configuration:
- `environment.ts` for development
- `environment.prod.ts` for production

Make sure to set the correct `socketServerUrl` in these files.

## Further help

To get more help on the Angular CLI use `yarn ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli).
