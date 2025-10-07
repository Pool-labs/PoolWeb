import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface AdminUser {
  uid: string;
  email: string;
  isAdmin: boolean;
}


/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<AdminUser | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Check if user is admin
    const adminDoc = await getDoc(doc(db, "admins", user.uid));
    if (adminDoc.exists() && adminDoc.data()?.isAdmin) {
      return {
        uid: user.uid,
        email: user.email!,
        isAdmin: true
      };
    } else {
      // Not an admin, sign out
      await firebaseSignOut(auth);
      return null;
    }
  } catch (error: any) {
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
}

/**
 * Get current user with admin check
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const user = auth.currentUser;
  
  if (!user) {
    return null;
  }
  
  try {
    // Check if user is admin
    const adminDoc = await getDoc(doc(db, "admins", user.uid));
    
    if (adminDoc.exists() && adminDoc.data()?.isAdmin) {
      return {
        uid: user.uid,
        email: user.email!,
        isAdmin: true
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback: (user: AdminUser | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const admin = await getCurrentAdmin();
      callback(admin);
    } else {
      callback(null);
    }
  });
}

