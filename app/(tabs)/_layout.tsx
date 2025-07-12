import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import BottomTabBar from '@/components/BottomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => <BottomTabBar />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="community" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}