import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

import formatDate from '../../utils/formatDate';

import { 
  Container,
  CardNews,
  ImageNews,
  DateNews,
  TitleNews,
  TextContentNews,
  LoadingData,
  TextLoadingData,
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

interface Props {
  formatDate(item: string): void;
}

const DetailNews: React.FC<Props> = () => {

  const navigation = useNavigation();
  const route = useRoute();
  
  const { newsId }: any = route.params;

  // console.log(newsId);

  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  function getImage(value: any){
    const [match] = value.match(/https?:\/\/[^"]+\.(jpg|jpeg|png)/s);
    // console.log(match);
    return match;
  };
  
  useEffect(() => {
    async function loadPost(){

      setLoading(true);

      await fetch(`https://blogdoneylima.com.br/wp-json/wp/v2/posts/${newsId}`)
      .then(response => response.json())
      .then(response => {
        // console.log([response]);
        setNews([response].map((item: News) => ({
          ...item,
          image: getImage(item.content?.rendered)
        })));
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
      
      {loading ? (
        <LoadingData>
          <ActivityIndicator size={25} color="#999591" />
          <TextLoadingData>Caregando...</TextLoadingData>
        </LoadingData>
        ) : (
        news.map((item: News) => (
        <CardNews key={item.id}>

          {/* <ImageNews source={{ uri: item?.image }} width={width - 56} height={width - 56} /> */}
          
          <Image 
            source={{ uri: item.image }}
            style={{ 
              width: width - 56,
              height: width - 56,
              backgroundColor: "#C8C8C8", 
              borderRadius: 10,
            }} 
            resizeMode="cover"
          />

          <DateNews>{formatDate(item?.date)}</DateNews>

          <TitleNews>{item.title?.rendered}</TitleNews>

          {/* <TextContentNews>{item.content?.rendered}</TextContentNews> */}

          <TextContentNews>{item.excerpt?.rendered}</TextContentNews>
        </CardNews>
        ))
      )}

    </Container>
  );
}

export default DetailNews;