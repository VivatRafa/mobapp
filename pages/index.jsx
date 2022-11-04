import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import AuthContext from '../context/AuthProvider';
import icons from '../icons';
import AuthScreen from './AuthScreen';
import CirculationScreen from './CirculationScreen';
import HistoryScreen from './HistoryScreen';
import PersonalScreen from './PersonalScreen';
import AboutScreen from './AboutScreen';
import RulesScreen from './RulesScreen';
import CirculationItemHistoryScreen from './CirculationItemHistoryScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const options = {
  headerStyle: {
    backgroundColor: '#121212',
  },
  headerTintColor: '#ACACAC',
}

const routes = [
  {
    name: 'Circulation',
    title: 'Текущий тираж',
    icon: 'Star',
    component: CirculationScreen,
    options,
  },
  {
    name: 'Personal',
    title: 'Личный кабинет',
    icon: 'Person',
    component: PersonalScreen,
    options,
  },
  {
    name: 'History',
    title: 'История',
    icon: 'History',
    component: HistoryScreen,
    options,
  },
  {
    name: 'CirculationHistory',
    title: 'История тиража',
    icon: 'History',
    component: CirculationItemHistoryScreen,
    options,
  },
  {
    name: 'About',
    title: 'О нас',
    icon: 'Star',
    component: AboutScreen,
    options,
  },
  {
    name: 'Rules',
    title: 'Правила',
    icon: 'Star',
    component: RulesScreen,
    options,
  },
]

export default function Navigator() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
          {isLoggedIn ?
              routes.map(({ name, title, icon, component, options }) => (
                  <Drawer.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        ...options, title,
                        drawerLabel: ({ focused }) => (
                        <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>{title}</Text>
                        ),
                        drawerIcon: () => {
                        const Icon = icons[icon];
                        return <Icon />
                        },
                        drawerActiveBackgroundColor: '#212121',
                        drawerInactiveBackgroundColor: '#000',
                        drawerContentStyle: { backgroundColor: '#000' },
                        drawerItemStyle: name === 'CirculationHistory' ? { height: 0 } : {},
                    }}
                  />
              )) : (
                  <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
              )
          }
          </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const drawerLabel = {
  color: '#fff',
  fontSize: 14,
}

const styles = StyleSheet.create({
  drawerLabel,
  drawerLabelFocused: {
    ...drawerLabel,
    color: '#03DAC5',
  }
});
