import { View, Text, StyleSheet } from "react-native";
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
        source={require('@/assets/svgs/homeVitalHomeScalable.svg')}
        contentFit='contain'
        style={Styles.headerLogo}
        />
        <Text style={Styles.headerText}>Velkomin <Text style={Styles.headerName}>{name}</Text></Text>
        <Image
        source={require('@/assets/svgs/notification.svg')}
        contentFit='contain'
        style={Styles.headerRight}
        />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerText: {
    flex: 1,
    fontFamily: 'OpenSansSemibold',
    fontSize: 18,
    color: DARK_GREEN,
    textAlign: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  headerName: {
    textTransform: 'capitalize',
  },
  headerRight: {
    width: 40,
    height: 34,
  }
});

export default HvHeader;