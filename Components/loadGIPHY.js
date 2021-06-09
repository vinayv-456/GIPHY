import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';

const loadGIPHY = ({response, loader, isEmpty}) => {
    const renderItem = ({item}) => (
        <View style={{display:'flex', alignItems:'center'}}>
          <Image
            style={styles.imageContainer}
            source={{
              uri: item.data
            }}
          />
        </View>
    )

    return (
        <View>
        {
            !loader
            ?
            (response.length>0 
            ?
            <FlatList
                data={response}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.responseView}
                keyExtractor={item => item.id}
            />
            :
            isEmpty && <Text style={{textAlign:'center'}}>Sorry, No Suggestions Found</Text>
            ):
            <ActivityIndicator size="large" color="#0000ff"/>
        }
        </View>
    );
}

export default loadGIPHY;

const styles = StyleSheet.create({
    imageContainer:{
      width: 150, 
      height: 150, 
      backgroundColor:'black',
      margin: 10,
    },
    responseView: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      paddingBottom: 180
    }
  });