import { Tabs } from "expo-router";
import { ChartPie, House, PersonStanding } from "lucide-react-native";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <ChartPie size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <PersonStanding size={28} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
