import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native"
import { StyleSheet } from 'react-native';
import { getUserProfile } from '../services/SpaceTraders';

import Toast from 'react-native-root-toast';

const Login = ({ setToken, setConfirmJoin, save }) => {

    const [userToken, setUserToken] = useState('');
    const [tokenCorrect, setUserCorrect] = useState(true);
    const STORE_TOKEN_KEY = 'mytoken'

    const tokenHandler = async () => {
        if (userToken !== '') {
            const data = await getUserProfile(userToken)
            if (data.user) {
                setUserCorrect(true)
                setToken(userToken)
                save(STORE_TOKEN_KEY, userToken)
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
            <View style={styles.backBtnPstn}>
                <Button title="← go Back" onPress={() => setConfirmJoin(0)} color={"red"}/>
            </View>
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
                        </>
                        : <>
                            <TextInput
                                style={styles.inputIncorrect}
                                onChangeText={setUserToken}
                                value={userToken}
                                placeholder='Introduzca token' />
                            <Text style={{ color: 'red' }}>SomeThing went wrong</Text>
                        </>
                }
                <Button title='Login' onPress={() => {tokenHandler()}} color={"green"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    backBtnPstn: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
        justifyContent: "flex-end",
        marginTop: 5,
        paddingRight: 5
    },
})

export default Login