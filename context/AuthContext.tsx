"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export interface AdminProfile {
  name: string;
  photoURL: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  adminProfile: AdminProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  adminProfile: null,
  loading: true,
  isAdmin: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      
      if (currentUser) {
        try {
          // Always try to fetch the profile from Firestore first for customized names/photos
          const adminDoc = await getDoc(doc(db, "admins", currentUser.email || "unknown"));
          
          if (adminDoc.exists()) {
            setIsAdmin(true);
            setUser(currentUser);
            const data = adminDoc.data();
            setAdminProfile({
              name: data.name,
              photoURL: data.photoURL,
              role: data.role || "Admin"
            });
          } else {
            // If they are not in the database, check if they are a hardcoded master email
            const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
            if (currentUser.email && adminEmails.includes(currentUser.email)) {
              setIsAdmin(true);
              setUser(currentUser);
              // Fallback if not yet migrated to the admins collection
              setAdminProfile({
                name: currentUser.displayName || "Admin Principal",
                photoURL: currentUser.photoURL || "",
                role: "Super Admin"
              });
            } else {
              // Not an admin at all
              setIsAdmin(false);
              setAdminProfile(null);
              await signOut(auth);
              setUser(null);
            }
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          setAdminProfile(null);
          await signOut(auth);
          setUser(null);
        }
      } else {
        setIsAdmin(false);
        setAdminProfile(null);
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, adminProfile, loading, isAdmin, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
