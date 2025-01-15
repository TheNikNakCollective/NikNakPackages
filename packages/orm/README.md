# @niknak/orm

A TypeORM-based library for managing repositories in the NikNak ecosystem. This package provides a structured and reusable implementation for database access, including profiles, authentication sessions, and authentication states.

---

## Features

- **TypeORM Integration**: Uses TypeORM to define and manage repositories.
- **Predefined Repositories**: Includes reusable repositories for profiles, authentication sessions, and authentication states.
- **Customizable Datasource**: Easily plug in your own `DataSource` for database configuration.
- **Type-Safe API**: Built with TypeScript for strong typing and developer-friendly interfaces.

---

## Installation

Install the package via npm or yarn:

```bash
npm install @niknak/orm
# or
yarn add @niknak/orm
```

---

## Usage

### 1. **Setup Your DataSource**

First, configure a TypeORM `DataSource`:

```typescript
import { DataSource } from 'typeorm'
import { entities } from '@niknak/orm'

const dataSource = new DataSource({
    type: 'postgres', // or 'mysql', 'sqlite', etc.
    host: 'localhost',
    port: 5432,
    username: 'your-username',
    password: 'your-password',
    database: 'your-database',
    synchronize: true, // Automatically sync schema in dev (not recommended for production)
    logging: true,
    entities, // Path to your entities
})
```

### 2. **Initialize the Database**

Use the `createDatabase` function to initialize repositories with the `DataSource`:

```typescript
import { createDatabase } from '@niknak/orm'

const database = createDatabase(dataSource)

database.profileRepository.findOneBy({ did })
```
