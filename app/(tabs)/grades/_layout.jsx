import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Notas',
        }}></Stack.Screen>
    </Stack>
  );
}