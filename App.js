/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios'
import Config from './gifhy-config';
import LoadGIPHY from './Components/loadGIPHY'


const App = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  

  const handleInputChange = (event) => {
    setQuery(event);
  }
  const handleSearch = () => {
    setLoader(true);
    setIsEmpty(false);
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${Config.key}&q=${query}&limit=${Config.limit}&offset=${Config.offset}&rating=${Config.rating}&lang=${Config.lang}`)
      .then((res) => {
        const arr = res.data.data;
        let temp = [];
        temp = arr.map(ele => {
          return {
            id: ele.id,
            data: ele.images.original.webp
          };
        });
        setLoader(false);
        setResponse([...temp]);
        if(temp.length==0)
        setIsEmpty(true);
    })
  }

  return <View>
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.textInput}
        value={query}
        onChangeText={handleInputChange} 
        placeholder="Enter any string"
      />
      <Button 
        style={styles.buttonInput}
        title="search"
        onPress={handleSearch}
      />
    </View>
    <LoadGIPHY loader={loader} response={response} isEmpty={isEmpty}/>
  </View>
};

const styles = StyleSheet.create({
  inputContainer:{
    display:'flex',
    flexDirection:'row',
    padding: 20,
    alignItems:'center'
  },
  textInput:{
    flex:1,
    borderWidth: 1,
    borderRadius: 20,
    marginRight:20
  },
  buttonInput: {
    padding:20
  },
});

export default App;
