/**
 * Global API Configuration
 */

// Base URL falls back to localhost if environment variable is not set
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// API Endpoints Definition
export const API_ENDPOINTS = {
  // Example Endpoints
  USERS: {
    LIST: '/users',
    DETAILS: (id: string | number) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string | number) => `/users/${id}`,
    DELETE: (id: string | number) => `/users/${id}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  DASHBOARD: {
    OVERALL_STATS: '/dashboard/villages',
    VILLAGE_STATS: (villageId: string) => `/dashboard/villages/${villageId}/stats`,
    ASSIGNMENT_STATS: (villageId: string) => `/dashboard/villages/${villageId}/assignments`,
  },
  USE_CASE: {
    BY_CATEGORY: (villageId: string, category: string) => `/use-case/category/${villageId}/${category}`,
    DETAILS: (assignmentId: string) => `/use-case/details/${assignmentId}`,
    ENTITIES: (assignmentId: string) => `/entity/assignment/${assignmentId}`,
    COORDINATES: (villageId: string) => `/use-case/village/${villageId}/coordinates`,
  },
  DEMOGRAPHIC: {
    VILLAGES: '/demographic/villages',
    VILLAGE_DETAILS: (villageId: string) => `/demographic/villages/${villageId}`,
  },
  USE_CASE_ADMIN: {
    BASE: '/use-case/master',
    DETAILS: (id: string) => `/use-case/master/${id}`,
  },
} as const;
