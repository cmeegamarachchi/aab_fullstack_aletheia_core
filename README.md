# aab_fullstack_aletheia_core

AppSolve Application Blocks - Aletheia Core TypeScript Types and Utilities

This package provides foundational TypeScript types and utility functions for the Aletheia fullstack platform.

## Installation

```bash
npm install aab_fullstack_aletheia_core
```

## Usage

### Types

```typescript
import {
  AletheiaConfig,
  AletheiaResponse,
  AletheiaRequest,
  AletheiaError,
  AletheiaErrorType,
  AletheiaLogLevel,
  AletheiaHealthStatus
} from 'aab_fullstack_aletheia_core';

// Example: Create a configuration
const config: AletheiaConfig = {
  name: 'my-service',
  version: '1.0.0',
  environment: 'production'
};

// Example: Create a response
const response: AletheiaResponse<string> = {
  success: true,
  data: 'Hello, Aletheia!',
  timestamp: new Date().toISOString()
};
```

### Utilities

```typescript
import {
  generateRequestId,
  createSuccessResponse,
  createErrorResponse,
  createRequest,
  validateRequiredFields,
  safeJsonParse,
  retry
} from 'aab_fullstack_aletheia_core';

// Generate unique request ID
const requestId = generateRequestId();

// Create standardized responses
const success = createSuccessResponse({ message: 'Operation completed' }, requestId);
const error = createErrorResponse('Operation failed', requestId);

// Create a request
const request = createRequest({ userId: 123 }, 'client-1');

// Validate required fields
const validationError = validateRequiredFields(
  { name: 'John', email: '' },
  ['name', 'email']
);

// Safe JSON parsing
const parseResult = safeJsonParse('{"key": "value"}');
if (parseResult.success) {
  console.log(parseResult.data);
}

// Retry with exponential backoff
const result = await retry(async () => {
  // Some operation that might fail
  return await fetch('/api/data');
}, 3, 1000);
```

## API Reference

### Types

- **AletheiaConfig**: Base configuration interface
- **AletheiaResponse<T>**: Standard response format
- **AletheiaRequest<T>**: Standard request format
- **AletheiaError**: Structured error information
- **AletheiaErrorType**: Enum of error types
- **AletheiaLogLevel**: Enum of logging levels
- **AletheiaLogEntry**: Log entry structure
- **AletheiaHealthStatus**: Health check status enum
- **AletheiaHealthCheck**: Health check response format

### Utilities

- **generateRequestId()**: Generate unique request identifiers
- **getCurrentTimestamp()**: Get current ISO timestamp
- **createSuccessResponse<T>(data, requestId?)**: Create success response
- **createErrorResponse(error, requestId?)**: Create error response
- **createRequest<T>(data, clientId?)**: Create standardized request
- **createLogEntry(level, message, source?, metadata?, requestId?)**: Create log entry
- **validateRequiredFields<T>(obj, fields)**: Validate required object fields
- **deepClone<T>(obj)**: Deep clone objects
- **safeJsonParse<T>(jsonString, defaultValue?)**: Safe JSON parsing with error handling
- **retry<T>(fn, maxAttempts?, baseDelay?)**: Retry with exponential backoff
- **debounce<T>(fn, delay)**: Debounce function calls

## License

ISC

## Author

Chintana Meegamarachchi
