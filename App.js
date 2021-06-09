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
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios'
import Config from './gifhy-config';
import LoadGIPHY from './Components/loadGIPHY'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


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
    Keyboard.dismiss();
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
        placeholder="Enter text here"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.buttonInput}>
        <FontAwesomeIcon icon={ faSearch } size={38}  />
      </TouchableOpacity>
    </View>
    <LoadGIPHY loader={loader} response={response} isEmpty={isEmpty}/>
  </View>
};

const styles = StyleSheet.create({
  inputContainer:{
    display:'flex',
    flexDirection:'row',
    padding: 20,
    alignItems:'center',
  },
  textInput:{
    flex:1,
    borderWidth: 1,
    backgroundColor:'#349beb',
    color: 'white',
    paddingHorizontal:10
  },
  buttonInput: {
    padding:20,
    backgroundColor:'#349beb',
    padding:5,
  },
});

export default App;
