import { SchoolItem } from "@/types/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SchoolState = {
  school: SchoolItem | null;
  setSchool: (school: SchoolItem | null) => void;
};

const useSchoolStore = create<SchoolState>()(
  persist(
    set => ({
      school: null,
      setSchool: school => {
        set({ school });
      },
    }),
    {
      name: "school-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ school: state.school }),
    }
  )
);

export default useSchoolStore;
