import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useEffect, useState } from 'react';
import { getUserProfile } from './services/SpaceTraders'

import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerStatus from './screens/ServerStatus';
import Profile from './screens/Profile';
import Logout from './screens/Logout';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import Loans from './screens/Loans';
import Ships from './screens/Ships';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
const STORE_TOKEN_KEY = 'mytoken'

export default function App() {

  const save = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  }

  const [userToken, setUserToken] = useState('')
  const [confirmJoin, setConfirmJoin] = useState(0)
  const [profile, setProfile] = useState({ user: { username: "", credits: "", shipCount: "", joinedAt: "" } });
  const [refresh, setRefresh] = useState(false)

  async function getValueFor(token) {
    const result = await AsyncStorage.getItem(token);
    if (result) {
      return result;
    } else {
      return '';
    }
  }

  const setLogout = () => {
    console.log("Logout...");
    setConfirmJoin(0)
    save(STORE_TOKEN_KEY, '')
    setUserToken('')
  }

  useEffect(() => {
    setRefresh(false)
    const retrieveStoredToken = async () => {
      const storedToken = await getValueFor(STORE_TOKEN_KEY);
      if (storedToken) {
        setUserToken(storedToken);
      }
      if (userToken !== '') {
        save(STORE_TOKEN_KEY, userToken)
      }
    }
    const fetchUserAccount = async () => {
      try {
        const data = await getUserProfile(userToken)
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    }
    retrieveStoredToken();
    if (userToken) {
      fetchUserAccount();
    }
    console.log("token => ", userToken);
  }, [userToken, refresh])

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
                            {() => <Login setToken={setUserToken} setConfirmJoin={setConfirmJoin} save={save} />}
                          </Drawer.Screen>
                          <Drawer.Screen name='Register'>
                            {() => <Register setToken={setUserToken} setConfirmJoin={setConfirmJoin} save={save} />}
                          </Drawer.Screen>
                        </>
                        : <>
                          <Drawer.Screen name='Register'>
                            {() => <Register setToken={setUserToken} setConfirmJoin={setConfirmJoin} save={save} />}
                          </Drawer.Screen>
                          <Drawer.Screen name='Log'>
                            {() => <Login setToken={setUserToken} setConfirmJoin={setConfirmJoin} save={save} />}
                          </Drawer.Screen>
                        </>
                  }
                </>
                : profile &&
                <>
                  <Drawer.Screen name='Home'>
                    {() => <Profile token={userToken} profile={profile} />}
                  </Drawer.Screen>

                  <Drawer.Screen name='Server Status' component={ServerStatus} />

                  <Drawer.Screen name='Loans'>
                    {() => <Loans token={userToken} setRefresh={setRefresh} />}
                  </Drawer.Screen>

                  <Drawer.Screen name='Ships'>
                    {() => <Ships token={userToken} />}
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
