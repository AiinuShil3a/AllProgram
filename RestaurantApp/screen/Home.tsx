import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
//npm install --save-dev @types/react-native-vector-icons (if : red code)
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
// import RNRestart from 'react-native-restart'; RestartApp Code : RNRestart.Restart()

//http://localhost:5000/Restaurants
const Home = ({navigation}: {navigation: any}) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //is not Success
  /*   const searchByName = async (name: String) => {
    const url = 'http://10.0.2.2:5000/Restaurants';
    const Enter = await fetch(`${url}/${id}`, {
      method: 'GET',
    }).then(response => {
      return response.json();
    });
    if (Enter) {
      Alert.alert(
        'Restaurant No. ' + `${id}` , 
        'name : ' + `${name}` + '\ntype : ' + `${type}` + '\nimage : ' + `${image}`,
        [{text: 'close', onPress: () => setLoading(true)}],
      );
    }
  }; */

  const alertNotFound404 = () => {
    Alert.alert('Not Found!!', 'Function is not ready!!!', [
      {text: 'CANCEL', onPress: () => setLoading(true)},
    ]);
  };
  const alertDeleteChoice = (id: number, name: string) => {
    Alert.alert('Delete!', 'Restaurant munu  name :  ' + `${name}` + ' ? ', [
      {text: 'OK', onPress: () => deleteMenu(id)},
      {text: 'CANCEL', onPress: () => setLoading(true)},
    ]);
  };

  const toDetail = async (id: number) => {
    navigation.navigate('DetailMmnu', {id: id});
  };

  const deleteMenu = async (id: number) => {
    const url = 'http://10.0.2.2:5000/RestaurantShil3aiinu';
    const Click = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    }).then(response => {
      return response.json();
    });
    if (Click) {
      Alert.alert(
        'Success!',
        'Restaurant munu no. ' + `${id}` + ' delete success!',
        [{text: 'close', onPress: () => setLoading(true)}],
      );
    }
  };

  useEffect(() => {
    fetch('http://10.0.2.2:5000/Restaurants')
      .then(response => response.json())
      .then(restaurant => setData(restaurant))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [Loading]);
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF'}}>
      <View>
        {Loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <View style={style.header}>
              <View>
                <Text style={{fontSize: 22, fontWeight: 'bold', color: '#000'}}>
                  Welcome to
                </Text>
                <Text style={{fontSize: 33, color: '#008000'}}>
                  Shil3aiinuRestaurant
                </Text>
              </View>
              <Icon name="plus-box" size={40} style={{color: '#98FB98'}} />
            </View>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={style.searchContainer}>
                <Icon
                  name="magnify"
                  size={48}
                  style={{
                    color: '#FFF',
                    backgroundColor: '#008000',
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                    justifyContent: 'center',
                  }}
                />

                <TextInput
                  placeholder="Search By ID..."
                  placeholderTextColor="#FFF"
                  style={style.input}
                  onSubmitEditing={() => alertNotFound404()}></TextInput>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <FlatList
                data={data}
                numColumns={2}
                onRefresh={() => setLoading(true)}
                refreshing={Loading}
                renderItem={({item}: any) => (
                  <View style={style.card}>
                    <TouchableOpacity onPress={() => toDetail(item.id)}>
                      <Image
                        style={{
                          height: 100,
                          width: 170,
                          borderBottomLeftRadius: 2,
                          borderTopLeftRadius: 15,
                          borderTopRightRadius: 15,
                        }}
                        source={{uri: item.Img}}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginTop: 10,
                        marginLeft: 15,
                        color: '#000',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginTop: 3,
                        marginLeft: 15,
                        color: '#000',
                      }}>
                      {item.type}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 'auto',
                        marginRight: 2,
                        marginBottom: 15,
                      }}>
                      <TouchableOpacity>
                        <View style={style.button}>
                          <Icon
                            name="archive-edit"
                            size={30}
                            style={{color: '#FFF'}}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => alertDeleteChoice(item.id, item.name)}>
                        <View style={style.button}>
                          <Icon
                            name="archive-remove"
                            size={30}
                            style={{color: '#FFF'}}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: '#98FB98',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    height: 225,
    width: 170,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#98FB98',
    marginRight: 10,
    borderRadius: 5,
  },
  footer: {
    backgroundColor: '#98FB98',
    height: 150,
    marginTop: 10,
  },
});
export default Home;
