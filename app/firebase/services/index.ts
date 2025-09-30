// Export all Firebase services
export * from './firestoreService';

// Re-export types for convenience
export type { PreregisterUser, PreregisterUserWithId, SurveyData } from './firestoreService';

// Re-export specific functions for convenience
export { preregisterUser, submitSurvey, updateUserVisitedSite } from './firestoreService';

// Re-export the service object
export { firestoreService } from './firestoreService';
