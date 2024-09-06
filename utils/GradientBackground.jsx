import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

export default function GradientBackground({ children, ...props }) {
  return (
    <LinearGradient
      colors={['rgba(242, 137, 17, 0.94)', 'rgba(235, 247, 243, 0.83)']}
      {...props}
    >
      <View>
        {children}
      </View>
    </LinearGradient>
  );
}