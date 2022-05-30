// import 'react-native-reanimated';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator, Share } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import { WebView } from 'react-native-webview';
// import axios from 'axios'

const { width } = Dimensions.get('window');

import formatDate from '../../utils/formatDate';

import useShare from '../../hooks/useShare';

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
  id?: number;
  image?: string;
  title?: Title;
  content?: Content;
  excerpt?: Excerpt;
  date?: any;
  midia?: any;
}

interface Props {
  formatDate(item: string): void;
}

const DetailNews: React.FC<Props> = () => {

  const { handleSetShare } = useShare();

  // const navigation = useNavigation();
  const route = useRoute();
  
  const { newsId }: any = route.params;

  // console.log(newsId);

  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  function getImage(value: any){
    const [match] = value?.match(/https?:\/\/[^"]+\.(jpg|jpeg|png)/s);
    // console.log(match);
    return match;
  };

  // excerpt?.rendered
  function modifiedExcerpt(value: any){
    // const modfied = value.replace(/[\<\/p\><\/p>]/g,"");
    const modfied = value?.replace(/<\/?[^]>/g,"");
    // const modfied = value;
    return modfied;
  };

  // function getMidia(value: any){
  //   const [valueMidia] = value?.match(/<iframe\s?[^"].*<\/iframe>/i);
    
  //   const [gettingSource] = valueMidia?.match(/https?:\/\/[^"]*/i);

  //   // console.log(valueMidia);
  //   // console.log(gettingSource);

  //   return gettingSource;
  // }
  
  useEffect(() => {
    async function loadPost(){

      setLoading(true);

      await fetch(`https://blogdoneylima.com.br/wp-json/wp/v2/posts/${newsId}`)
      .then(response => response.json())
      .then(response => {
        // console.log([response]);
        setNews([response].map((item: News) => ({
          ...item,
          image: getImage(item.content?.rendered),
          excerpt: modifiedExcerpt(item.excerpt?.rendered),
          // midia: getMidia(item.content?.rendered)
        })));
        
        // handleSetShare([response].map((item: News) => ({
        //   title: item?.title.rendered,
        //   link: item?.link,
        // })));
        handleSetShare(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setNews([]);
        setLoading(false);
      })
      // const response: News = await axios.get(`https://blogdoneylima.com.br/wp-json/wp/v2/posts/${newsId}`);
      // setNews([response]);
      // console.log(response);
    }
    loadPost();
  }, [newsId]);

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
          <TextLoadingData>Carregando...</TextLoadingData>
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

          <TextContentNews>{item?.excerpt}</TextContentNews>

          {/* <Text>{item?.midia}</Text> */}

          {/* `${item?.midia}` */}
          
          {/* {item?.midia && (
            <WebView
              style={{ paddingTop: 24, height: 152, backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              originWhitelist={['*']}
              source={{ uri: `${item?.midia}` }}
            />
          )} */}
          
        </CardNews>
        ))
      )}

    </Container>
  );
}

export default DetailNews;