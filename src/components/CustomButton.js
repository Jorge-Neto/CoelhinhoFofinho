import React from 'react';
import { TouchableOpacity, Pressable } from 'react-native';
import withClickSound from '../utils/withClickSound';

export const TouchableWithSound = withClickSound(TouchableOpacity);
export const PressableWithSound = withClickSound(Pressable);