import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getNewUser } from '../services/SpaceTraders';
import { useState } from "react";

import Toast from 'react-native-root-toast';

const Register = ({ setToken, setConfirmJoin }) => {
    
    const [newUserNickname, setNewUserNickname] = useState('');
    const [confirmNewUser, setConfirmNewUser] = useState(true);

    const tokenHandler = async () => {
        if (newUserNickname !== '') {
            const data = await getNewUser(newUserNickname)
            if (data.user) {
                console.log("Nickname Creado");
                setToken(data.token)
            } else {
                console.log("El usuario ya existe");
                setConfirmNewUser(false)
                Toast.show('Invalid Nickname, Please introduce other', {
                    duration: Toast.durations.LONG
                })
            }
        } else {
            Toast.show('Introduzca un Nickname para continuar', {
                duration: Toast.durations.LONG
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Button title='goBack' onPress={() => setConfirmJoin(0)} />
            <View style={styles.container}>
                <Text>Register: </Text>
                {
                    confirmNewUser
                        ? <TextInput
                            style={styles.input}
                            onChangeText={setNewUserNickname}
                            value={newUserNickname}
                            placeholder='Introduzca Nickname' />
                        : <>
                            <TextInput
                                style={styles.inputIncorrect}
                                onChangeText={setNewUserNickname}
                                value={newUserNickname}
                                placeholder='Introduzca Nickname' />
                        </>
                }
                <Button title='Register' onPress={tokenHandler} />
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

export default Register