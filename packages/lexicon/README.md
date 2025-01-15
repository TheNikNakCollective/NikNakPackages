# @niknak/lexicon

**@niknak/lexicon** is a library that provides a comprehensive implementation of the AT Protocol (ATProto) lexicon, tailored for use within the NikNak PDS (Personal Data Server) ecosystem. This package simplifies working with schemas, definitions, and metadata for applications that utilize ATProto.

---

## Features

- **ATProto Lexicon Implementation**: Predefined schemas and definitions for the AT Protocol.
- **NikNak-Specific Additions**: Includes extensions such as `app.nknk.status` for custom use cases.
- **Type Safety**: All schemas and definitions are strongly typed, ensuring reliability during development.
- **Ready-to-Use Schemas**: Bundles common ATProto lexicons, including profiles, labels, and records.

---

## Installation

Install the package via npm or yarn:

```bash
npm install @niknak/lexicon
# or
yarn add @niknak/lexicon
```

---

## Usage

### Importing the Lexicon

You can easily access and work with predefined schemas, lexicons, and IDs:

```typescript
import { lexicons, schemas, ids } from '@niknak/lexicon/lexicon/lexicons'

// Example: Access a specific lexicon schema
const profileSchema = lexicons.getSchema(ids.AppBskyActorProfile);
console.log(profileSchema);

// List all available schemas
console.log(schemas);
```

### Validating Data Against a Schema

```typescript
import { lexicons } from '@niknak/lexicon/lexicon/lexicons'

const profileData = {
  displayName: 'John Doe',
  description: 'A developer on Bluesky.',
  createdAt: '2025-01-14T12:00:00Z',
};

// Validate data using a schema
const validationResult = lexicons.validate('app.bsky.actor.profile', profileData);

if (validationResult.success) {
  console.log('Profile is valid:', validationResult.data);
} else {
  console.error('Validation failed:', validationResult.errors);
}
```

### Accessing Custom NikNak Definitions

```typescript
import { lexicons, ids } from '@niknak/lexicon/lexicon/lexicons'

const statusSchema = lexicons.getSchema(ids.AppNknkStatus);
console.log('NikNak Status Schema:', statusSchema);
```