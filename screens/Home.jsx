import { View, StyleSheet, Button } from 'react-native'

import Login from './Login'
import Register from './Register'

const Home = () => {
    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Button title='Login' onPress={() => {<Login />}} />
                <Button title='Register' onPress={() => {<Register />}} />
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