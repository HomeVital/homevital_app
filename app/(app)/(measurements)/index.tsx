import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Image } from 'expo-image';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvText from '@/components/ui/hvText';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import { DARK_GREEN, LIGHT_THEME, WHITE } from '@/constants/colors';


const MainMeasurements = () => {

    // radio buttons
    const [hand, setHand] = useState('');
    const [position, setPosition] = useState('');
    // num inputs
    const [sys, setSys] = useState('');
    const [dia, setDia] = useState('');
    const [pulse, setPulse] = useState('');

    const selectLeft = () => {
        if (hand == 'Vinstri')
            setHand('');
        else
            setHand('Vinstri');
    }

    const selectRight = () => {
        if (hand == 'Hægri')
            setHand('');
        else
            setHand('Hægri');
    }

    const selectSitting = () => {
        if (position == 'Sitjandi')
            setPosition('');
        else
            setPosition('Sitjandi');
    }

    const selectLaying = () => {
        if (position == 'Liggjandi')
            setPosition('');
        else
            setPosition('Liggjandi');
    }

    return (
        <HvScrollView>
            <View style={STYLES.defaultView}>
                <View style={Styles.container}>
                
                    <View style={Styles.itemsContainer}>
                        <View style={Styles.itemContainer}>
                            <View style={Styles.inputContainer}>

                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='l'>Mæli hönd</HvText>
                                    <HvText size='s'>{hand}</HvText>
                                </View>

                                <View style={Styles.radioContainer}>
                                    <TouchableOpacity
                                    onPress={selectLeft}
                                    style={hand != 'Vinstri' ? {opacity: 0.3} : {}}
                                    >
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/handLeft.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='xs' style={Styles.test}>Vinstri</HvText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={selectRight}
                                    style={hand != 'Hægri' ? {opacity: 0.3} : {}}
                                    >
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/handRight.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='xs'>Hægri</HvText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={Styles.itemsContainer}>
                        <View style={Styles.itemContainer}>
                            <View style={Styles.inputContainer}>

                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='l'>Líkamsstaða</HvText>
                                    <HvText size='s'>{position}</HvText>
                                </View>

                                <View style={Styles.radioContainer}>
                                    <TouchableOpacity
                                    onPress={selectSitting}
                                    style={position != 'Sitjandi' ? {opacity: 0.3} : {}}
                                    >
                                            <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                            <Image source={require('@/assets/svgs/sitting.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='xs' style={Styles.test}>Sitjandi</HvText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={selectLaying}
                                    style={position != 'Liggjandi' ? {opacity: 0.3} : {}}
                                    >
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/laying.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='xs'>Liggjandi</HvText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={Styles.itemsContainer}>

                        <View style={Styles.itemContainer}>
                            <HvText weight='light' size='xl'>Efri mörk</HvText>
                            <View style={Styles.inputContainer}>
                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='xxl'>SYS</HvText>
                                    <HvText size='xs'>mmHg</HvText>
                                </View>
                                <View style={Styles.inputShadow}>
                                    <TextInput
                                        value={sys}
                                        keyboardType='number-pad'
                                        maxLength={3}
                                        // placeholder='ex. 120'
                                        selectTextOnFocus={true}
                                        textAlign='right'
                                        // enterKeyHint='next'
                                        onChangeText={text => setSys(text)}
                                        style={Styles.textInput}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={Styles.itemContainer}>
                            <HvText weight='light' size='xl'>Neðri mörk</HvText>
                            <View style={Styles.inputContainer}>
                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='xxl'>DIA</HvText>
                                    <HvText size='xs'>mmHg</HvText>
                                </View>
                                <View style={Styles.inputShadow}>
                                    <TextInput
                                        value={dia}
                                        keyboardType='number-pad'
                                        maxLength={3}
                                        // placeholder='ex. 120'
                                        selectTextOnFocus={true}
                                        textAlign='right'
                                        // enterKeyHint='next'
                                        onChangeText={text => setDia(text)}
                                        style={Styles.textInput}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={Styles.itemContainer}>
                            <HvText weight='light' size='xl'></HvText>
                            <View style={Styles.inputContainer}>
                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='xxl'>Púls</HvText>
                                    <HvText size='xs'>bpm</HvText>
                                </View>
                                <View style={Styles.inputShadow}>
                                    <TextInput
                                        value={pulse}
                                        keyboardType='number-pad'
                                        maxLength={3}
                                        // placeholder='ex. 120'
                                        selectTextOnFocus={true}
                                        textAlign='right'
                                        // enterKeyHint='next'
                                        onChangeText={text => setPulse(text)}
                                        style={Styles.textInput}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <HvInputForm onPress={() => console.log("banana")} />
                </View>
            </View>
        </HvScrollView>
    );
}

const Styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 20,
        gap: 20,
        borderRadius: 10,
        backgroundColor: WHITE,
        maxWidth: 500,
    },
    itemsContainer: {
        padding: 20,
        gap: 30,
        borderRadius: 10,
        backgroundColor: LIGHT_THEME,
    },
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
    inputShadow: {
        width: 120,
        height: 60,
        marginRight: 20,
        borderRadius: 10,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    textInput: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: WHITE,
        fontSize: 24,
        fontFamily: 'OpenSansSemiBold',
        color: DARK_GREEN,
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
    test: {
        position: 'absolute',
        width: 100,
        textAlign: 'right',
        bottom: 0,
        right: 0,
    },
});


export default MainMeasurements;


{/* <Card>
    <TouchableRipple
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
    >
        <Card.Content>
            <HvText>Þyngd</HvText>
            <HvText>Hæð</HvText>
        </Card.Content>
    </TouchableRipple>
</Card> */}