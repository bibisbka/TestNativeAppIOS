import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

type Props = {
  route: {
    params: {
      photoUrl: string;
    };
  };
};
const SecondScreen: React.FC<Props> = ({ route }) => {
  const { photoUrl } = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: photoUrl }}
        resizeMode={'center'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default SecondScreen;
