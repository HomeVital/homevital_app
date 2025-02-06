import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
// components
import HvText from '@/components/ui/hvText';


interface Props {
    itemState: string;
    setItemState: (value: string) => void;
    leftIcon: string;
    rightIcon: string;
    description: string;
    leftText: string;
    rightText: string;
}


const HvToggleSelect = ({ itemState, setItemState, leftIcon, rightIcon, description, leftText, rightText }: Props) => {

const selectLeft = () => {
    // if (itemState == leftText)
    //     setItemState('');
    // else
    setItemState(leftText);
}

const selectRight = () => {
    // if (itemState == rightText)
    //     setItemState('');
    // else
    setItemState(rightText);
}

return (
<View style={Styles.itemContainer}>
    <View style={Styles.inputContainer}>
        <View style={Styles.descriptionContainer}>
            <HvText weight='semibold' size='l'>{description}</HvText>
            <HvText size='s'>{itemState}</HvText>
        </View>
        <View style={Styles.radioContainer}>
            <TouchableOpacity
            onPress={selectLeft}
            style={itemState != leftText ? {opacity: 0.3} : {}}
            >
                <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                <Image source={leftIcon} style={Styles.iconInCircle}/>
                <HvText size='xs' style={Styles.leftText}>{leftText}</HvText>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={selectRight}
            style={itemState != rightText ? {opacity: 0.3} : {}}
            >
                <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                <Image source={rightIcon} style={Styles.iconInCircle}/>
                <HvText size='xs'>{rightText}</HvText>
            </TouchableOpacity>
        </View>
    </View>
</View>
)}


const Styles = StyleSheet.create({
    itemContainer: {
        gap: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        width: 120,
    },
    descriptionContainer: {
        justifyContent: 'center',
    },
    circle: {
        width: 40,
        height: 40,
    },
    iconInCircle: {
        position: 'absolute',
        top: 4,
        left: 4,
        width: 32,
        height: 32,
    },
    leftText: {
        position: 'absolute',
        width: 100,
        textAlign: 'right',
        bottom: 0,
        right: 0,
    },
});


export default HvToggleSelect;