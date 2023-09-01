import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';

const FirstStart = ({navigation}: {navigation: any}) => {
  const touch = () => {
    navigation.navigate('Home');
  };
  return (
    <Pressable onPress={touch}>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.95, justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/RestaurantShiba.png')}
            style={{width: 300, height: 300}}></Image>
        </View>
        <View style={{flex: 0.05, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 16}}>Shil3aiinu.co</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FirstStart;
