# Backend Architecture Guidelines

## Layer-Based Structure (Flat)
The backend is organized into three main layers within `src/`. Each layer contains descriptive files for each domain, kept directly in the layer's root folder (no nested domain folders).

### 1. Controllers (`src/controllers/`)
Responsible for handling HTTP requests and responses. They should only call Services.
- Example: `RunController.js`, `UserController.js`, `TournamentController.js`

### 2. Services (`src/services/`)
Contains all business logic, validations, and complex calculations. They should call Repositories.
- Example: `RunService.js`, `UserService.js`, `TournamentService.js`

### 3. Repositories (`src/repositories/`)
The only layer that interacts directly with the database (via Prisma).
- Example: `RunRepository.js`, `UserRepository.js`, `TournamentRepository.js`

## Conventions
- **Naming**: Always use `DomainLayer.js` format (e.g., `AuthRepository.js`).
- **Imports**: Repositories import `database/index`, Services import Repositories, and Controllers import Services.
- **Routes**: Located in `src/routes/`, they must import Controllers from the flat `src/controllers/` directory.
