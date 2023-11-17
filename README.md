# Take-Home Test - Monorepo Project - GitHub Commit Viewer

This monorepo project is a GitHub Commit Viewer, showcasing the commit history and repository information for the current project using the GitHub API.

## Table of Contents
- [Introduction](#introduction)
- [Package Manager and Workspaces](#package-manager-and-workspaces)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)

## Introduction

This project aims to provide a user-friendly interface for exploring GitHub commit history and repository details. The frontend, built with Next.js, interacts with the backend, powered by NestJS, to fetch data from the GitHub API.

## Package Manager and Workspaces
This project uses pnpm as the package manager and utilizes pnpm workspaces for managing the monorepo structure.
Feel free to refer to the pnpm documentation for more information.

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React
  - TypeScript
  - TailwindCSS
  - tRPC
  - Jest (for testing)
  - Cypress (for end-to-end testing)

- **Backend:**
  - NestJS
  - TypeScript
  - tRPC
  - Jest (for testing)

- **Other Libraries:**
  - Zod (for schema validation)
  - MomentJS (for date formatting)

## Folder Structure

- `apps/`
  - `backend/`: Contains the NestJS backend.
  - `frontend/`: Houses the Next.js frontend.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/danpvlz/take-home-test.git
   cd take-home-test
    ```
2. Create .env files in the backend and frontend directories with the following content:
    # backend/.env
   ```bash
    GITHUB_TOKEN=my-token
    PORT=5000
    ```
    # frontend/.env
   ```bash
    NEXT_PUBLIC_NESTJS_BACKEND=http://localhost:5000
    ```
3. Install dependencies for both backend and frontend:

   ```bash
   pnpm install
    ```

## Usage

Start the project

```bash
pnpm dev
```

## Testing

### Whole project
Run the following command in the root directory:

```bash
pnpm run test
```
  
### Backend Testing

Run the following command in the root directory:
```bash
cd apps/backend
pnpm run test
```

### Frontend Testing 

#### Unit testing (Jest)

Run the following command in the root directory:
```bash
cd apps/frontend
pnpm run test
```

#### End-to-End Testing (Cypress)
**Must have project running**
Run the following command in the root directory:
```bash
cd apps/frontend
pnpm run cypress:run
```