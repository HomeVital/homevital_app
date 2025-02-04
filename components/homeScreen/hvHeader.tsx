import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
// constants
import { DARK_GREEN } from "@/constants/colors";

interface Props {
    name: string;
}

const HvHeader = ({ name }: Props) => {
  return (
    <View style={Styles.container}>
        <Image
        source={require('@/assets/svgs/logoSmall.svg')}
        contentFit='contain'
        style={Styles.headerLogo}
        />
        <Text style={Styles.headerText}>Velkomin {name}</Text>
        <TouchableOpacity>
          <Image
          source={require('@/assets/svgs/notificationBell.svg')}
          contentFit='contain'
          style={Styles.headerRight}
          />
        </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 30,
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'OpenSansSemibold',
    fontSize: 18,
    color: DARK_GREEN,
    textTransform: 'capitalize',
  },
  headerRight: {
    width: 40,
    height: 34,
  }
});

export default HvHeader;