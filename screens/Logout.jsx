import { View, Text, StyleSheet, Button } from 'react-native'

const Logout = ({setLogout}) => {
    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Text>Logout</Text>
                <Button title='Logout' onPress={setLogout} />
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
})

export default Logout