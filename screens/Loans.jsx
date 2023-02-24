import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { getAvailableLoans, takeALoan } from '../services/SpaceTraders';
import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-root-toast';

const Loans = ({ token, setRefresh }) => {
    const [loans, setLoans] = useState('')
    const navigaton = useNavigation()

    useEffect(() => {
        const availableLoans = async () => {
            const data = await getAvailableLoans(token)
            setLoans(data)
        }
        availableLoans()
    }, [])

    const takeLoan = async (type) => {
        const data = await takeALoan(token, type);
        try {
            if (data.loan.status) {
                Toast.show(`Loan '${data.loan.type}' take`, {
                    duration: Toast.durations.LONG
                })
                setRefresh(true)
                navigaton.navigate('Home')
            }
        } catch (error) {
            Toast.show(`You can only take the loan once`, {
                duration: Toast.durations.LONG
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Available Loans</Text>

                <FlatList data={loans.loans} renderItem={({ item, index }) => {
                    console.log(item);
                    return (
                        loans === ''
                            ? <Text>No loans Available</Text>
                            : <View style={styles.modal_structure}>
                                <Text style={{ fontSize: 20 }}>Loan:</Text>
                                <Text>- {item.amount} Crd</Text>
                                <Text>- Rate: {item.rate} %</Text>
                                <Text>- Term: {item.termInDays} days</Text>
                                <Text style={{ paddingBottom: 10 }}>- Type: {item.type}</Text>
                                <Button title='takeLoan' onPress={() => takeLoan(item.type)} />
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
        borderColor: 'black',
        borderWidth: 1,
        width: 200,
        padding: 10,
        height: 180,
        borderRadius: 10,
        backgroundColor: '#fff'
    }
})

export default Loans