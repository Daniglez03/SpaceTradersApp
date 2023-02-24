import { View, Text, StyleSheet, Button, Pressable } from 'react-native'

const Logout = ({setLogout}) => {
    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Pressable onPress={setLogout} style={styles.button}>
                    <Text>LOGOUT</Text>
                </Pressable>
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
        backgroundColor: 'red',
    },
})

export default Logout