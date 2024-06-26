/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-pager-view';
import 'react-native-reanimated';
import 'react-native-url-polyfill/auto';
import '@ethersproject/shims';
import {Buffer} from '@craftzdog/react-native-buffer';
global.Buffer = Buffer;
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
