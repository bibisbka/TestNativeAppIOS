import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  PhotoType,
  getPhotosList,
  InitialState,
  AppDispatch,
} from '../redux/RTK';
import { AppStateType } from '../redux/RTK';
import Spinner from '../components/Spinner';

const MainScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getPhotosList(page));
  }, [page]);
  const navigation = useNavigation();
  const handleEndReached = () => {
    setPage(page + 1);
  };
  const { photosList, loading } = useSelector<AppStateType, InitialState>(
    (state) => state,
  );
  const renderItem = ({ item }: { item: PhotoType }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SecondScreen', {
              photoUrl: item.fullSizePhotoUrl,
            });
          }}>
          <View style={styles.imageView}>
            <Image style={styles.image} source={{ uri: item.smallPhotoUrl }} />
          </View>
        </TouchableOpacity>
        <View style={styles.text}>
          <Text>Username: {item.username}</Text>
          <Text numberOfLines={5}>Description: {item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {loading ? <Spinner /> : null}
      <FlatList
        data={photosList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={handleEndReached}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'lightgrey',
    marginVertical: 5,
    flexDirection: 'row',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageView: {
    margin: 10,
    flex: 1,
  },
  text: {
    marginTop: 10,
    flex: 1,
  },
});

export default MainScreen;
