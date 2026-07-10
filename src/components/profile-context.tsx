import { createContext, ReactNode, useContext, useState } from "react";

export type ProfileData = {
  name: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  age: string;
  stepGoal: string;
  photoUri: string | null;
  lastUpdated: string;
};

type ProfileContextValue = {
  data: ProfileData;
  updateField: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  setLastUpdatedToday: () => void;
};

const defaultData: ProfileData = {
  name: "",
  heightFt: "5",
  heightIn: "9",
  weight: "74.5",
  age: "32",
  stepGoal: "10000",
  photoUri: null,
  lastUpdated: "July 10, 2026",
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ProfileData>(defaultData);

  const updateField = <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const setLastUpdatedToday = () => {
    const today = new Date();
    const formatted = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setData((prev) => ({ ...prev, lastUpdated: formatted }));
  };

  return (
    <ProfileContext.Provider value={{ data, updateField, setLastUpdatedToday }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return ctx;
};