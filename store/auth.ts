import { logout } from "@/actions/users";
import { UserItem } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User extends UserItem {}

export interface SessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface UserSessionStore {
  user: User | null;
  setUser: (userData: UserItem) => void;
  clearSession: () => Promise<void>;
}

//
export const useUserSession = create<UserSessionStore>()(
  persist(
    set => ({
      user: null,

      setUser: async userData => {
        try {
          set({ user: userData });
        } catch (error) {
          console.error("Session creation error", error);
        }
      },

      clearSession: async () => {
        try {
          const result = await logout();

          if (result.success) {
            set({ user: null });
          } else {
            throw new Error("Failed to clear user session");
          }
        } catch (error) {
          console.error("Logout error", error);
        }
      },
    }),
    {
      name: "user-session",
      partialize: state => ({ user: state.user }),
    }
  )
);
