import { View, StyleSheet, Button } from 'react-native'

const Home = ({ setConfirmJoin }) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.position}>
                    <Button title='Login' onPress={() => setConfirmJoin(1)} color={"green"} />
                    <Button title='Register' onPress={() => setConfirmJoin(2)} color={"orange"} />
                </View>
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
    position: {
        height: 100,
        display: 'flex',
        justifyContent: 'space-between'
    }
})

export default Home