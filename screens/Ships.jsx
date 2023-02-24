import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { getAvailableShips } from '../services/SpaceTraders';
import { shipsAvailableImages } from '../images/ships.js';

const Ships = ({token}) => {

    const [ships, setShips] = useState([])
    useEffect(() => {
        const availableLoans = async () => {
            const data = await getAvailableShips(token)
            setShips(data)
            console.log(ships);
        }
        availableLoans()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Available Ships</Text>

                <FlatList data={ships.shipListings} renderItem={({ item, index }) => {
                    return (
                        ships === ''
                            ? <Text>No loans Available</Text>
                            : <View style={styles.modal_structure}>
                                <View>
                                    <Image source={shipsAvailableImages[index]} style={{height: 100, width: 100}} />
                                </View>
                                <View>
                                    <Text>Type: {item.type}</Text>
                                    <Text>Speed: {item.speed}</Text>
                                    <Text>Weapons: {item.weapons}</Text>
                                    <Text>Cargo: {item.maxCargo}</Text>
                                </View>
                            </View>
                    )
                }} />

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
    title: {
        fontSize: 30,
    },
    modal_structure: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        padding: 10,
        height: 180,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default Ships