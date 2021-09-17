import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

import { 
  Container,
  CardNews,
  ImageNews,
  DateNews,
  TitleNews,
  TextContentNews,
} from './styles';

interface Title {
  rendered?: string;
}

interface Content {
  rendered?: string;
}

interface Excerpt {
  rendered?: string;
}

interface News {
  id: number;
  image?: string;
  title?: Title;
  content?: Content;
  excerpt?: Excerpt;
  date?: string;
}

const DetailNews: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  
  const { newsId } = route.params;

  // console.log(newsId);

  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function loadPost(){

      setLoading(true);
      const response = fetch(`https://blogdoneylima.com.br/wp-json/wp/v2/posts/${newsId}`)
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setNews([response]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
      })

      // const response: News = await axios.get(`https://blogdoneylima.com.br/wp-json/wp/v2/posts/${newsId}`);
      // setNews([response]);
      // console.log(response);
    }
    loadPost();
  }, []);

  return (
    <Container
      vertical
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 16,
        paddingHorizontal: 16,
      }}
    >
      
      {news.map((item) => (
        <CardNews key={item.id}>

          <ImageNews source={{ uri: item?.image }} height={width / 2} />

          <DateNews>{item.date}</DateNews>

          <TitleNews>{item.title?.rendered}</TitleNews>

          {/* <TextContentNews>{item.content?.rendered}</TextContentNews> */}

          <TextContentNews>{item.excerpt?.rendered}</TextContentNews>
        </CardNews>
      ))}

    </Container>
  );
}

export default DetailNews;