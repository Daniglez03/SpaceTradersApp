import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useEffect, useState } from 'react';

import * as SecureStore from 'expo-secure-store';
import ServerStatus from './screens/ServerStatus';
import Profile from './screens/Profile';
import Logout from './screens/Logout';
import Home from './screens/Home';

const Drawer = createDrawerNavigator();
const STORE_TOKEN_KEY = 'mytoken'

export default function App() {

  useEffect(() => {
    const retrieveStoreToken = async () => {
      const storeToken = await getValueFor(STORE_TOKEN_KEY)
      setUserToken(storeToken)
    }
    retrieveStoreToken();
  }, [userToken])

  const getValueFor = async(key) => {
    let result = await SecureStore.getItemAsync(key);
  }

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  }

  const [userToken, setUserToken] = useState('')

  const storeUserToken = (newToken) => {
    console.log(newToken);
    setUserToken(newToken);
    save(STORE_TOKEN_KEY, newToken)
    setUserToken(newToken)
  }

  const setLogout = () => {
    console.log("Logout...");
    setUserToken('')
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          {
            userToken === ''
            ?
            <>
              <Drawer.Screen name='Home' component={Home} />
            </>
            :
            <>
              <Drawer.Screen name='Server Status' component={ServerStatus} />
              <Drawer.Screen name='Profile' component={Profile} />
              <Drawer.Screen name='Logout'>
                {() => <Logout setLogout={setLogout} />}
              </Drawer.Screen>
            </>
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
