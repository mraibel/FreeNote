import { Stack } from 'expo-router';

export default function TabLayout() {

  return (
    <Stack
      screenOptions={{
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Semestres',
        }}
      />
      <Stack.Screen
        name="newSemester"
        options={{
          title: 'Inscribiendo ramos',
        }}
      />
      <Stack.Screen
        name='semester/[id]'
        options={{
          title: 'Semestre'
        }}
      />
      <Stack.Screen
        name='semester/subject/[id]'
        options={{
          title: 'Asignatura'
        }}
      />
    </Stack>
  );
}