import React, {useContext, useRef} from 'react';
import {Icon} from 'react-native-elements';
// import Feather from 'react-native-vector-icons/';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  DarkTheme,
  NavigationContainer,
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import {
  StackScreenProps,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import {AppContext} from './context';
import CreatePoolScreen from './screens/CreatePoolScreen';
import Gacha from './screens/Gacha';
import HomeScreen from './screens/HomeScreen';
import CreateWallet from './screens/createWallet';
import MediaExplore from './screens/mediaExplore';
export type MainTabsParamList = {
  Home: undefined;
  Create: undefined;
  Event: undefined;
  'Game Center': undefined;
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
      screenOptions={({route, navigation}) => ({
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerTitleAlign: 'center',
        //headerShown: false,
        //headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#7749fc',
      })}>
      <BottomTab.Screen
        name={'Home'}
        component={MediaExplore}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />

      <BottomTab.Screen
        name={'Event'}
        component={CreatePoolScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            return (
              <Icon type="material" name="event" size={size} color={color} />
            );
          },
        }}

        //listeners={tabScreenListenterCheckAuth}
      />
      <BottomTab.Screen
        name={'Game Center'}
        component={HomeScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                type="simple-line-icon"
                name="game-controller"
                size={size}
                color={color}
              />
            );
          },
        }}
        //listeners={tabScreenListenterCheckAuth}
      />
    </BottomTab.Navigator>
  );
}

const MainNavigator = () => {
  const navigationRef =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList>>();
  //handle deeplink here

  const onStateChange = (value?: NavigationState) => {
    //handle tracking here
  };

  const {currentAccount} = useContext(AppContext);

  const isLogin = currentAccount.isSaved;
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          ...DarkTheme.colors,
          background: '#1a1a1a',
          card: '#121212',
          primary: '#6631FF',
        },
      }}
      ref={ref => {
        if (ref) {
          navigationRef.current = ref;
        }
      }}
      onStateChange={onStateChange}>
      <RootStack.Navigator initialRouteName="MainTabs">
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
              component={Gacha}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
              }}
            />
          </>
        ) : (
          <RootStack.Screen
            name={'CreateWallet'}
            component={CreateWallet}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
