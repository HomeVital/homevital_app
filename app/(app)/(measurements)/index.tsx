import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Image } from 'expo-image';
// components
import HvText from '@/components/ui/hvText';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import { DARK_GREEN, LIGHT_THEME, WHITE } from '@/constants/colors';
import { Button } from 'react-native-paper';


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
        <ScrollView fadingEdgeLength={50}>
            <View style={STYLES.defaultView}>
                <View style={[STYLES.defaultView, Styles.container]}>
                
                    <View style={Styles.itemsContainer}>

                        <View style={Styles.itemContainer}>
                            <View style={Styles.inputContainer}>

                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='xl'>Mæli hönd</HvText>
                                    <HvText size='s'>{hand}</HvText>
                                </View>

                                <View style={Styles.radioContainer}>
                                    <TouchableOpacity
                                    onPress={selectLeft}
                                    style={hand != 'Vinstri' ? {opacity: 0.3} : {}}
                                    >
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/handLeft.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='s'>Vinstri</HvText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={selectRight}
                                    style={hand != 'Hægri' ? {opacity: 0.3} : {}}
                                    >
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/handRight.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='s'>Hægri</HvText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        <View style={Styles.itemContainer}>
                            <View style={Styles.inputContainer}>

                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='xl'>Mæli hönd</HvText>
                                    <HvText size='s'>{position}</HvText>
                                </View>

                                <View style={Styles.radioContainer}>
                                    <TouchableOpacity
                                    onPress={selectSitting}
                                    style={position != 'Sitjandi' ? {opacity: 0.3} : {}}
                                    >
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/sitting.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='s'>Sitjandi</HvText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={selectLaying}
                                    style={position != 'Liggjandi' ? {opacity: 0.3} : {}}
                                    >
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/laying.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='s'>Liggjandi</HvText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* <View style={Styles.itemContainer}>
                            <View style={Styles.inputContainer}>

                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='xl'>Mæli hönd</HvText>
                                    <HvText size='s'>Hægri</HvText>
                                </View>

                                <View style={Styles.radioContainer}>
                                    <TouchableOpacity>
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/sitting.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='s'>Vinstri</HvText>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle}/>
                                        <Image source={require('@/assets/svgs/laying.svg')} style={Styles.iconInCircle}/>
                                        <HvText size='s'>Hægri</HvText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> */}

                    </View>


                    <View style={Styles.itemsContainer}>

                        <View style={Styles.itemContainer}>
                            <HvText weight='light' size='xl'>Efri mörk</HvText>
                            <View style={Styles.inputContainer}>
                                <View style={Styles.descriptionContainer}>
                                    <HvText weight='semibold' size='xxl'>SYS</HvText>
                                    <HvText size='s'>mmHg</HvText>
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
                                    <HvText size='s'>mmHg</HvText>
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
                                    <HvText size='s'>bpm</HvText>
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
                    <Button mode="contained" onPress={() => console.log("banana")}>Senda</Button>
                    <HvInputForm onPress={() => console.log("banana")} />
                </View>
            </View>
        </ScrollView>
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
        gap: 20,
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