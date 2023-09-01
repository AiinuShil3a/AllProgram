import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

// Define the type for the restaurant details
interface Restaurant {
  name: string;
  type: string;
  Img: string;
  createdAt: any;
  updatedAt: any;
  // Add other properties if needed
}

const DetailMenu = ({route}: any) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Restaurant | null>(null); // Set the initial type to "Restaurant | null"

  const url = 'http://10.0.2.2:5000/Restaurants';
  const id = route.params.id;

  useEffect(() => {
    const fetchDetail = () => {
      return fetch(`${url}/${id}`, {method: 'GET'})
        .then(response => response.json())
        .then((restaurant: Restaurant) => setData(restaurant)) // Set the type of "restaurant" as "Restaurant"
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    };
    fetchDetail();
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <View style={styles.header}>
            <Text style={{fontSize: 33, color: '#008000', fontWeight: 'bold'}}>
              {data?.name}
            </Text>
          </View>
          <View style={styles.hero}>
            <Text style={{fontSize: 18, color: '#000'}}>
              ประเภท : {data?.type}
            </Text>
            <Text style={{fontSize: 18, color: '#008000'}}>
              โพสเมื่อ : {data?.createdAt}
            </Text>
            <Text style={{fontSize: 18, color: '#008000'}}>
              อัพเดทล่าสุด : {data?.updatedAt}
            </Text>
          </View>
          <Image
            style={styles.heroImg}
            source={{uri: data?.Img}}
          />  
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginLeft: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hero: {
    marginTop: 40,
    marginLeft: 40,
  },
  heroImg: {
    width: 332,
    height: 300,
    marginTop: 40,
    marginLeft: 40,
    borderRadius: 15,
  },
});

export default DetailMenu;
