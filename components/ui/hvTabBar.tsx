import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
// import { Link, RelativePathString } from "expo-router";
import { RelativePathString, router} from 'expo-router';
// constants
import { DARK_GREEN, LIGHT_GRAY, WHITE } from "@/constants/colors";


// for updating routes right
const handleTabRoute = (route: string, prev: string) => {
    if (router.canDismiss() && prev !== route) {
        router.dismiss();
    }
    router.push(route as RelativePathString);
    return route;
}


const HvTabBar = () => {
    const [stackName, setStackName] = useState("");
    return (
        <View style={Styles.container}>
            
            <TouchableOpacity 
                style={Styles.tabContainer}
                activeOpacity={0.5}
                onPress={() => {
                    setStackName(handleTabRoute("/(app)/(measurements)", stackName));
                }}
            >
                    <Image
                        source={require('@/assets/svgs/barChart.svg')}
                        contentFit='contain'
                        style={Styles.tabLogo}
                    />
                    <Text style={Styles.tabText}>Mælingar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={Styles.tabContainer}
                activeOpacity={0.5}
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
                activeOpacity={0.5}
                onPress={() => {
                    setStackName(handleTabRoute("/(app)/(settings)", stackName));
                }}

            >
                <Image
                    source={require('@/assets/svgs/manUser.svg')}
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