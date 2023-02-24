import { Text, View, Image, Pressable } from "react-native"
import { StyleSheet } from 'react-native';

import * as Clipboard from 'expo-clipboard'
import Toast from 'react-native-root-toast';

const Profile = ({ token, profile }) => {

    const copyText = (token) => {
        Clipboard.setStringAsync(token)
        Toast.show(`Token : ${token} copiado en el portapapeles`, {
            duration: Toast.durations.LONG
        })
    }

    return (
        <View style={{ borderWidth: 5, height: '100%', borderColor: 'white' }}>
            <Pressable onPress={() => copyText(token)}>
                <Image style={{width: 30, height: 30, marginTop: 5, marginLeft: 5}} source={require('../assets/others/copy.png')}/>
            </Pressable>
            
            <View style={styles.edit}>
                <Image style={styles.image} source={require('../assets/others/user.png')} />
                <Text style={{ paddingTop: 35 }}>NickName:  <Text style={{fontSize: 20}}>{profile.user.username}</Text></Text>
            </View>
            <View style={styles.viewText}>
                <Text style={styles.textAlign}><Text style={styles.blackAlign}>ShipCount: </Text>{profile.user.shipCount}</Text>
                <Text style={styles.textAlign}><Text style={styles.blackAlign}>StructureCount: </Text>{profile.user.structureCount}</Text>
                <Text style={styles.textAlign}><Text style={styles.blackAlign}>JoinedAt: </Text>{profile.user.joinedAt.substring(0, 10)}</Text>
                <Text style={styles.textAlign}><Text style={styles.blackAlign}>Credits: </Text>{profile.user.credits}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    edit: {
        display: 'flex',
        borderColor: 'white',
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    image: {
        borderColor: 'skyblue',
        borderWidth: 5,
        borderRadius: 50,
        width: 90,
        height: 90,
        marginBottom: 35
    },
    viewText: {
        padding: 10,
    },
    textAlign: {
        textAlign: 'center'
    },
    blackAlign: {
        fontSize: 20,
    }
})

export default Profile