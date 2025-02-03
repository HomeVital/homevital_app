import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
// import { Link, RelativePathString } from "expo-router";
import { router, useRouter } from 'expo-router';
// constants
import { DARK_GREEN, LIGHT_GRAY, WHITE } from "@/constants/colors";

interface Props {
    // measurementRoute: RelativePathString;
    // registrationRoute: string;
    // settingsRoute: string;
    // measurementsText: string;
    // registrationText: string;
    // SettingsText: string;
}

const HvTabBar = () => {
  return (
    <View style={Styles.container}>
        
        <TouchableOpacity 
            style={Styles.tabContainer}
            activeOpacity={0.3}
            onPress={() => router.push('/(app)/(measurements)')}
        >
                <Image
                source={require('@/assets/svgs/barChartScalable.svg')}
                contentFit='contain'
                style={Styles.tabLogo}
                />
                <Text style={Styles.tabText}>Mælingar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={Styles.tabContainer}
            activeOpacity={0.3}
        >
            <Image
            source={require('@/assets/svgs/add.svg')}
            contentFit='contain'
            style={Styles.tabLogoLarge}
            />
            <Text style={Styles.tabText}>Skrá mælingu</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={Styles.tabContainer}
            activeOpacity={0.3}
        >
            <Image
            source={require('@/assets/svgs/profileScalable.svg')}
            contentFit='contain'
            style={Styles.tabLogo}
            />
            <Text style={Styles.tabText}>Stillingar</Text>
        </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: LIGHT_GRAY,
  },
  tabContainer: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: 'flex-end',
  },
  tabText: {
    fontFamily: 'OpenSans',
    height: 20,
    fontSize: 12,
    textAlign: 'center',
    color: DARK_GREEN,
  },
  tabLogo: {
    width: '100%',
    height: 40,
  },
  tabLogoLarge: {
    position: 'absolute',
    width: '100%',
    height: 80,
    bottom: 29,
  }
});

export default HvTabBar;