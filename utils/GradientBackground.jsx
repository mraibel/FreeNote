import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

export default function GradientBackground({ children, ...props }) {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.975)', 'rgba(252,125,70,1)']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.74, y: 1 }}
      {...props}
    >
      <View>
        {children}
      </View>
    </LinearGradient>
  );
}