import { View, StyleSheet, Button } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Home = ({ setConfirmJoin }) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button title='Login' onPress={() => setConfirmJoin(1)} />
                <Button title='Register' onPress={() => setConfirmJoin(2)} />
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

export default Home