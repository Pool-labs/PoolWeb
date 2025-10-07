// Export all Firebase services
export * from './firestoreService';
export * from './authService';

// Re-export types for convenience
export type { PreregisterUser, PreregisterUserWithId, SurveyData } from './firestoreService';
export type { AdminUser } from './authService';

// Re-export specific functions for convenience
export { preregisterUser, submitSurvey, updateUserVisitedSite } from './firestoreService';
export { signIn, signOut, getCurrentAdmin, onAuthChange } from './authService';

// Re-export the service object
export { firestoreService } from './firestoreService';
