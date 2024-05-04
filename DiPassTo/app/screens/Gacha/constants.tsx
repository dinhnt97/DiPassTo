import {Dimensions} from 'react-native';

export const WIDTH_SCREEN = Dimensions.get('window').width;
export const TIME_OUT_REQUEST = 10 * 1000;
export const DEFAULT_SPEED = 0.004;
export const MAX_SPEED = 0.012;
export const SYMBOLS_PER_PATCH = 4;
export const SYMBOL_RATIO = 110 / 88;
export const MIN_SPEED = 0.001;
export const SYMBOL_WIDTH = WIDTH_SCREEN / SYMBOLS_PER_PATCH;
export const START_POSITION = -SYMBOL_WIDTH / 2;
export const SYMBOL_HEIGHT = (SYMBOL_WIDTH * 110) / 88;
export const SYMBOLS = 'CEACDEBED';
export const START_DURATION = 250;
export const ACCELERATION = 0.0007;
