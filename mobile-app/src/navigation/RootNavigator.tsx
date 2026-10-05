import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { StoryDetailsScreen } from '../screens/StoryDetailsScreen';
import { ReaderScreen } from '../screens/ReaderScreen';
import { AudioPlayerScreen } from '../screens/AudioPlayerScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="StoryDetails" component={StoryDetailsScreen} />
      <Stack.Screen name="Reader" component={ReaderScreen} />
      <Stack.Screen
        name="AudioPlayer"
        component={AudioPlayerScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
