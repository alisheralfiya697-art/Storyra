import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { StoryTreeScreen } from '../screens/StoryTreeScreen';
import { WriterStudioScreen } from '../screens/WriterStudioScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E1B18',
          borderTopColor: '#38312B',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#F3ACB6',
        tabBarInactiveTintColor: '#8E7F73',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🧭</Text>,
        }}
      />
      <Tab.Screen
        name="Universe"
        component={StoryTreeScreen}
        options={{
          tabBarLabel: 'Universe',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🌿</Text>,
        }}
      />
      <Tab.Screen
        name="Studio"
        component={WriterStudioScreen}
        options={{
          tabBarLabel: 'Studio',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>✍️</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
