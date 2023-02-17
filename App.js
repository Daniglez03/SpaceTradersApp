import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useState } from 'react';

import * as SecureStore from 'expo-secure-store';
import ServerStatus from './screens/ServerStatus';
import Profile from './screens/Profile';
import Logout from './screens/Logout';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import 'react-native-gesture-handler';
import Loans from './screens/Loans';
import Ships from './screens/Ships';

const Drawer = createDrawerNavigator();
const STORE_TOKEN_KEY = 'mytoken'

export default function App() {

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  }

  const [userToken, setUserToken] = useState('')
  const [confirmJoin, setConfirmJoin] = useState(0)

  const storeUserToken = (newToken) => {
    console.log(newToken);
    setUserToken(newToken);
    save(STORE_TOKEN_KEY, newToken)
    setUserToken(newToken)
  }

  const setLogout = () => {
    console.log("Logout...");
    setConfirmJoin(0)
    setUserToken('')
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Login'>
          <>
            {
              userToken === ''
                ? <>
                  {
                    confirmJoin === 0
                      ? <Drawer.Screen name='Login'>
                        {() => <Home setConfirmJoin={setConfirmJoin} />}
                      </Drawer.Screen>
                      : confirmJoin === 1
                        ? <>
                          <Drawer.Screen name='Log'>
                            {() => <Login setToken={setUserToken} setConfirmJoin={setConfirmJoin} />}
                          </Drawer.Screen>
                          <Drawer.Screen name='Register'>
                            {() => <Register setToken={setUserToken} setConfirmJoin={setConfirmJoin} />}
                          </Drawer.Screen>
                        </>
                        : <>
                          <Drawer.Screen name='Register'>
                            {() => <Register setToken={setUserToken} setConfirmJoin={setConfirmJoin} />}
                          </Drawer.Screen>
                          <Drawer.Screen name='Log'>
                            {() => <Login setToken={setUserToken} setConfirmJoin={setConfirmJoin} />}
                          </Drawer.Screen>
                        </>
                  }
                </>
                : <>
                  <Drawer.Screen name='Home'>
                    {() => <Profile token={userToken} />}
                  </Drawer.Screen>

                  <Drawer.Screen name='Server Status' component={ServerStatus} />

                  <Drawer.Screen name='Loans'>
                    {() => <Loans token={userToken} />}
                  </Drawer.Screen>

                  <Drawer.Screen name='Ships'>
                    {() => <Ships token={userToken}/>}
                  </Drawer.Screen>

                  <Drawer.Screen name='Logout'>
                    {() => <Logout setLogout={setLogout} />}
                  </Drawer.Screen>
                </>
            }
          </>
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
