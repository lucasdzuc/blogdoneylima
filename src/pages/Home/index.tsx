import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import { 
  Container,

} from './styles';

const Home: React.FC = () => {

  const [news, setNews] = useState([]);

  useEffect(() => {
    async function loadNews(){
      // const response = axios.('https://www.blogdoneylima.com.br/wp-json/');
      // console.log(response);
      fetch('https://www.blogdoneylima.com.br/wp-json/', {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
    }
    loadNews();
  }, []);

  return (
    <Container>
      <Text>FEED</Text>
    </Container>
  );
}

export default Home;