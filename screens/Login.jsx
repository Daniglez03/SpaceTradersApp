import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native"
import { StyleSheet } from 'react-native';
import { getUserProfile } from '../services/SpaceTraders';
import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-root-toast';

const Login = ({ setToken, setConfirmJoin }) => {

    const [userToken, setUserToken] = useState('');
    const [tokenCorrect, setUserCorrect] = useState(true);

    const tokenHandler = async () => {
        if (userToken !== '') {
            const data = await getUserProfile(userToken)
            if (data.user) {
                setUserCorrect(true)
                setToken(userToken)
                console.log(userToken);
                setUserToken('')
            } else {
                console.log("Token Inválido");
                setUserCorrect(false)
            }
        } else {
            Toast.show('Introduzca un Token para continuar', {
                duration: Toast.durations.LONG
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Button title="goBack" onPress={() => setConfirmJoin(0)} />
            <View style={styles.container}>
                <Text>Login: </Text>
                {
                    tokenCorrect
                        ? <>
                            <TextInput
                                style={styles.input}
                                onChangeText={setUserToken}
                                value={userToken}
                                placeholder='Introduzca token' />
                            <Button title='Home' onPress={() => {tokenHandler()}} />
                        </>
                        : <>
                            <TextInput
                                style={styles.inputIncorrect}
                                onChangeText={setUserToken}
                                value={userToken}
                                placeholder='Introduzca token' />
                            <Text style={{ color: 'red' }}>SomeThing went wrong</Text>
                            <Button title='Home' onPress={() => {tokenHandler()}} />
                        </>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-end'
    },
    button: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        width: 80,
        backgroundColor: 'lightgreen',
    },
    input: {
        paddingRight: 10,
        paddingLeft: 10,
        height: 25,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 2,
    },
    inputIncorrect: {
        paddingRight: 10,
        paddingLeft: 10,
        height: 25,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 2,
    }
})

export default Login