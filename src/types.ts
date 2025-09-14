/**
 * Core types for AppSolve Application Blocks - Aletheia
 * Foundational TypeScript types and interfaces for the Aletheia platform
 */

/**
 * Base configuration interface for Aletheia components
 */
export interface AletheiaConfig {
  /** Component name or identifier */
  name: string;
  /** Version of the component */
  version: string;
  /** Environment (development, staging, production, etc.) */
  environment?: string;
  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * Standard response format for Aletheia APIs
 */
export interface AletheiaResponse<T = any> {
  /** Whether the operation was successful */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if operation failed */
  error?: string;
  /** Additional error details */
  errorDetails?: Record<string, any>;
  /** Timestamp of the response */
  timestamp: string;
  /** Request ID for tracing */
  requestId?: string;
}

/**
 * Standard request format for Aletheia APIs
 */
export interface AletheiaRequest<T = any> {
  /** Request payload */
  data: T;
  /** Request ID for tracing */
  requestId?: string;
  /** Timestamp of the request */
  timestamp: string;
  /** User or client identifier */
  clientId?: string;
}

/**
 * Error types for Aletheia operations
 */
export enum AletheiaErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR'
}

/**
 * Structured error information
 */
export interface AletheiaError {
  /** Error type */
  type: AletheiaErrorType;
  /** Error message */
  message: string;
  /** Error code */
  code?: string;
  /** Additional context */
  context?: Record<string, any>;
  /** Stack trace for debugging */
  stack?: string;
}

/**
 * Logging levels for Aletheia components
 */
export enum AletheiaLogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL'
}

/**
 * Log entry structure
 */
export interface AletheiaLogEntry {
  /** Log level */
  level: AletheiaLogLevel;
  /** Log message */
  message: string;
  /** Timestamp */
  timestamp: string;
  /** Component or module name */
  source?: string;
  /** Additional metadata */
  metadata?: Record<string, any>;
  /** Request ID for correlation */
  requestId?: string;
}

/**
 * Health check status
 */
export enum AletheiaHealthStatus {
  HEALTHY = 'HEALTHY',
  DEGRADED = 'DEGRADED',
  UNHEALTHY = 'UNHEALTHY',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Health check response
 */
export interface AletheiaHealthCheck {
  /** Overall health status */
  status: AletheiaHealthStatus;
  /** Timestamp of the check */
  timestamp: string;
  /** Individual component checks */
  checks?: Record<string, {
    status: AletheiaHealthStatus;
    message?: string;
    data?: any;
  }>;
  /** System information */
  system?: {
    uptime: number;
    version: string;
    environment: string;
  };
}