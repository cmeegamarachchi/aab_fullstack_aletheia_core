/**
 * Utility functions for AppSolve Application Blocks - Aletheia
 * Common utility functions used across the Aletheia platform
 */

import {
  AletheiaResponse,
  AletheiaRequest,
  AletheiaError,
  AletheiaErrorType,
  AletheiaLogEntry,
  AletheiaLogLevel
} from './types';

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return `aletheia-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get current ISO timestamp
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Create a successful Aletheia response
 */
export function createSuccessResponse<T>(
  data: T,
  requestId?: string
): AletheiaResponse<T> {
  return {
    success: true,
    data,
    timestamp: getCurrentTimestamp(),
    requestId
  };
}

/**
 * Create an error Aletheia response
 */
export function createErrorResponse(
  error: string | AletheiaError,
  requestId?: string
): AletheiaResponse {
  const errorObj = typeof error === 'string' 
    ? { type: AletheiaErrorType.INTERNAL_ERROR, message: error }
    : error;

  return {
    success: false,
    error: errorObj.message,
    errorDetails: {
      type: errorObj.type,
      code: errorObj.code,
      context: errorObj.context
    },
    timestamp: getCurrentTimestamp(),
    requestId
  };
}

/**
 * Create an Aletheia request
 */
export function createRequest<T>(
  data: T,
  clientId?: string
): AletheiaRequest<T> {
  return {
    data,
    requestId: generateRequestId(),
    timestamp: getCurrentTimestamp(),
    clientId
  };
}

/**
 * Create a log entry
 */
export function createLogEntry(
  level: AletheiaLogLevel,
  message: string,
  source?: string,
  metadata?: Record<string, any>,
  requestId?: string
): AletheiaLogEntry {
  return {
    level,
    message,
    timestamp: getCurrentTimestamp(),
    source,
    metadata,
    requestId
  };
}

/**
 * Validate required fields in an object
 */
export function validateRequiredFields<T extends Record<string, any>>(
  obj: T,
  requiredFields: (keyof T)[]
): AletheiaError | null {
  const missingFields = requiredFields.filter(field => 
    obj[field] === undefined || obj[field] === null || obj[field] === ''
  );

  if (missingFields.length > 0) {
    return {
      type: AletheiaErrorType.VALIDATION_ERROR,
      message: `Missing required fields: ${missingFields.join(', ')}`,
      code: 'MISSING_REQUIRED_FIELDS',
      context: { missingFields }
    };
  }

  return null;
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}

/**
 * Safely parse JSON with error handling
 */
export function safeJsonParse<T = any>(
  jsonString: string,
  defaultValue?: T
): { success: true; data: T } | { success: false; error: AletheiaError } {
  try {
    const data = JSON.parse(jsonString);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        type: AletheiaErrorType.VALIDATION_ERROR,
        message: 'Invalid JSON format',
        code: 'JSON_PARSE_ERROR',
        context: { 
          originalError: error instanceof Error ? error.message : String(error),
          input: jsonString.length > 100 ? jsonString.substring(0, 100) + '...' : jsonString
        }
      }
    };
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}