import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  isLoading: boolean;
  updateField: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  setLastUpdatedToday: () => void;
  saveProfileToStorage: (customData?: ProfileData) => Promise<void>;
};

const defaultData: ProfileData = {
  name: "Alex Johnson",
  heightFt: "5",
  heightIn: "9",
  weight: "74.5",
  age: "32",
  stepGoal: "10000",
  photoUri: null,
  lastUpdated: "July 10, 2026",
};

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined,
);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ProfileData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("profiledata");
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Failed to load profile data from storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const updateField = <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => {
    setData((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  const saveProfileToStorage = async (customData?: ProfileData) => {
    try {
      const dataToSave = customData || data;
      await AsyncStorage.setItem("profiledata", JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Failed to save profile data", error);
    }
  };

  const setLastUpdatedToday = () => {
    const today = new Date();
    const formatted = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setData((prev) => {
      const updated = { ...prev, lastUpdated: formatted };
      saveProfileToStorage(updated);
      return updated;
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        data,
        isLoading,
        updateField,
        setLastUpdatedToday,
        saveProfileToStorage,
      }}
    >
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
