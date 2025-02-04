import { GREEN, WHITE } from "@/constants/colors";
import { useState } from "react";
import { Switch } from "react-native";

const MainSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch  
    onValueChange={() => setIsEnabled(!isEnabled)}
    value={isEnabled}
    thumbColor={WHITE}
    trackColor={{ false: "#767577", true: GREEN }}
    />
  );
}
  
export default MainSettings;