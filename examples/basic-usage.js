/**
 * Basic usage example for aab_fullstack_aletheia_core
 */

const {
  AletheiaErrorType,
  generateRequestId,
  createSuccessResponse,
  createErrorResponse,
  createRequest,
  validateRequiredFields,
  safeJsonParse
} = require('../dist/index.js');

console.log('=== aab_fullstack_aletheia_core Example ===\n');

// Generate a request ID
const requestId = generateRequestId();
console.log('Generated Request ID:', requestId);

// Create a success response
const successResponse = createSuccessResponse(
  { message: 'Hello from Aletheia!', userId: 123 },
  requestId
);
console.log('Success Response:', JSON.stringify(successResponse, null, 2));

// Create an error response
const errorResponse = createErrorResponse({
  type: AletheiaErrorType.VALIDATION_ERROR,
  message: 'Required field missing',
  code: 'FIELD_REQUIRED'
}, requestId);
console.log('Error Response:', JSON.stringify(errorResponse, null, 2));

// Create a request
const request = createRequest(
  { action: 'getUserData', userId: 123 },
  'client-example'
);
console.log('Request:', JSON.stringify(request, null, 2));

// Validate required fields
const userData = { name: 'John Doe', email: '' };
const validationError = validateRequiredFields(userData, ['name', 'email']);
console.log('Validation Error:', validationError);

// Safe JSON parsing
const validJson = '{"status": "success", "data": [1, 2, 3]}';
const invalidJson = '{"status": "success", "data": [1, 2,';

console.log('Valid JSON Parse:', safeJsonParse(validJson));
console.log('Invalid JSON Parse:', safeJsonParse(invalidJson));

console.log('\n=== Example completed successfully! ===');