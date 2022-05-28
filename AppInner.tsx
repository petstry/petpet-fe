import MyPet from './src/features/mypet/components';
import Home from './src/features/home';
import Calendar from './src/features/calendar/components';
import GuideScreen from './src/features/auth/component/GuideScreen';
import * as React from 'react';
import {useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList, LoggedInTabParamList} from './src/common/models';
import SignUpScreen from './src/features/auth/component/SignUpScreen';

const Tab = createBottomTabNavigator<LoggedInTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFB933',
    background: 'white',
  },
};

function AppInner() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={MyTheme}>
        {!isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{title: '홈'}} />
            <Tab.Screen
              name="Calendar"
              component={Calendar}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="MyPet"
              component={MyPet}
              options={{title: '마이펫', headerShown: false}}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="GuideScreen"
              component={GuideScreen}
              options={{title: '가이드', headerShown: false}}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{title: '회원가입', headerShown: true}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default AppInner;
