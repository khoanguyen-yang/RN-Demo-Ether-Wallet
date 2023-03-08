import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { useAppSelector } from '../hooks/redux';
import { selectIsHavingExistingAddress } from '../selectors/addressSelectors';

import ImportSeed from '../screens/ImportSeed';
import Home from '../screens/Home';
import ManageAccount from '../screens/ManageAccount';

const Stack = createNativeStackNavigator();

export const Screen = {
  ImportSeed: 'ImportSeed',
  Home: 'Home',
  ManageAccount: 'ManageAccount',
};

const MainNavigation = () => {
  const haveExistingWallet = useAppSelector(selectIsHavingExistingAddress);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          !haveExistingWallet ? Screen.ImportSeed : Screen.Home
        }>
        <Stack.Screen name={Screen.ImportSeed} component={ImportSeed} />
        <Stack.Screen name={Screen.Home} component={Home} />
        <Stack.Screen name={Screen.ManageAccount} component={ManageAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
