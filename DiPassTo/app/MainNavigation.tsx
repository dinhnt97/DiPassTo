import React, {useRef} from 'react';

import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import {
  StackScreenProps,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
export type MainTabsParamList = {
  Home: undefined;
  Create: undefined;
};

export type RootStackParamList = {
  MainTabs: BottomTabNavigationProp<MainTabsParamList>;
  CreatePool: undefined;
  Gacha: undefined;
  CreateWallet: undefined;
};

export type NestingRootStackScreenProps<T extends keyof RootStackParamList> =
  CompositeScreenProps<
    StackScreenProps<RootStackParamList, T>,
    BottomTabScreenProps<MainTabsParamList>
  >;

export type NestingMainTabsScreenProps<T extends keyof MainTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, T>,
    StackScreenProps<RootStackParamList>
  >;

const RootStack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<MainTabsParamList>();

function MainTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}) => ({
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerTitleAlign: 'center',
        //headerShown: false,
        //headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <BottomTab.Screen
        name={'Home'}
        component={() => null}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <BottomTab.Screen
        name={'Create'}
        component={() => null}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
        //listeners={tabScreenListenterCheckAuth}
      />
    </BottomTab.Navigator>
  );
}

const MainNavigator = ({onReady}: {onReady: () => {}}) => {
  const navigationRef =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList>>();
  //handle deeplink here

  const onStateChange = (value?: NavigationState) => {
    //handle tracking here
  };

  const isLogin = true;
  return (
    <NavigationContainer
      ref={ref => {
        if (ref) {
          navigationRef.current = ref;
        }
      }}
      onReady={onReady}
      onStateChange={onStateChange}>
      <RootStack.Navigator>
        {isLogin ? (
          <>
            <RootStack.Screen
              name={'MainTabs'}
              component={MainTabs}
              options={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={'Gacha'}
              component={() => null}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
          </>
        ) : (
          <RootStack.Screen
            name={'CreateWallet'}
            component={() => null}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
