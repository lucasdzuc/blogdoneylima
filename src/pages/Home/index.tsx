import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import formatDate from '../../utils/formatDate';

import {
  Container,
  NewsListProvider,
  HeaderList,
  ButtonRedirectSearch,
  TextButtonRedirectSearch,
  ButtonFilter,
  ContentCardNews,
  CardNews,
  ButtonDetailsNews,
  ImageNews,
  DateNews,
  TitleNews,
  ContentButtonLeadMore,
  ButtonLeadMoreNews,
  TextButtonLeadMoreNews,
  ContainerModalize,
  HeaderModalize,
  TitleHeaderModalize,
  ContainerButtonCloseModalModilize,
  ButtonCloseModalModalize,
  TextButtonCloseModilize,
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
  date?: any;
}

interface Types {
  formatDate(arg0: string): void
}

const Home: React.FC<Types> = () => {

  const modalizeRef = useRef<Modalize>(null);

  const navigation = useNavigation();

  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigateToSearch = useCallback(() => {
    navigation.navigate('Search' as any);
  }, []);

  const navigateToDetailNews = useCallback((newsId: any) => {
    navigation.navigate('DetailNews', { newsId });
  }, []);

  function getImage(value: any) {
    
    // const content = value.slice(0, 780);
    
    const match = value.match(/https?:\/\/[^"]+\.(jpg|jpeg|png)/i);

    const interetor = match[Symbol.iterator]();

    const formatImage = interetor.next().value;
    
    // console.log(formatImage);

    return formatImage;
  };

  async function loadNews() {
    try {
      if (loading) {
        return;
      }
      if (total > 0 && news.length === total) {
        return;
      }
      setLoading(true);
      const response = await api.get(`/wp/v2/posts`, {
        params: {
          page,
          _per_page: 10,
        }
      });
      // const data = response.data.filter((res: any) => res.title.rendered !== "<NO>" && res.title.rendered !== "<no>");
      // .filter((res: any) => res.title?.rendered !== "<NO>" && res.title?.rendered !== "<no>")
      setTotal(response.headers['x-wp-total']);
      setPage(page + 1);
      setNews([
        ...news,
        ...response.data.map((item: News) => ({
          id: item?.id,
          title: item.title?.rendered,
          content: item.content?.rendered,
          date: item.date,
        })).filter((res: any) => res.title !== "<NO>" && res.title !== "<no>"),
      ]);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadNews();
  }, [news]);

  function wait(timeout: number) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    setLoading(true);
      const response = await api.get(`/wp/v2/posts`, {
        params: {
          page,
          _per_page: 10,
        }
      });
      setTotal(response.headers['x-wp-total']);
      setPage(page + 1);
      setNews([
        ...news,
        ...response.data.map((item: News) => ({
          id: item?.id,
          title: item.title?.rendered,
          content: item.content?.rendered,
          date: item.date,
        })).filter((res: any) => res.title !== "<NO>" && res.title !== "<no>"),
      ]);
      setLoading(false);

    wait(1000).then(() => setRefreshing(false));
  }, [refreshing, news]);

  function FooterList({ load }: any){
    if (!load) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size={24} color="#999591" />
      </View>
    )
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    // setIdPost();
    modalizeRef.current?.close();
  };

  // console.log(news);

  const dateToday = new Date().toLocaleDateString();
  
  function getDatePost(date: any){
    const datePost = new Date(date).toLocaleDateString();
    // const refinedDatePost = datePost.toLocaleDateString();
    // console.log(datePost);
    
    return datePost;
  }

  return (
    <Container>

      <NewsListProvider
        data={news}
        keyExtractor={(item: any) => String(item.id)}
        onEndReached={loadNews}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          paddingHorizontal: 16,
          // paddingVertical: 8,
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <HeaderList>
            <ButtonRedirectSearch onPress={navigateToSearch} activeOpacity={0.9}>
              <TextButtonRedirectSearch>Pesquisar notícia...</TextButtonRedirectSearch>
              <Feather name="search" size={24} color="#858585" />
            </ButtonRedirectSearch>

            <ButtonFilter onPress={onOpen} activeOpacity={0.6}>
              <Feather name="sliders" size={24} color="#858585" />
            </ButtonFilter>
          </HeaderList>
        }
        ListHeaderComponentStyle={{
          paddingVertical: 48,
        }}
        ListFooterComponent={ <FooterList load={loading} /> }
        renderItem={({ item }: any) => (
          <CardNews>
            
            <ButtonDetailsNews onPress={() => navigateToDetailNews(item.id)} activeOpacity={1}>
              {/* {item.image.map((img: any) => console.log(img))} */}
                {/* <ImageNews source={{ uri: img?.value }} resizeMode="cover" /> */}
                {/* <ImageNews source={{ uri: item?.value }} resizeMode="cover" /> */}
              <ImageNews source={{ uri: getImage(item.content) }} resizeMode="cover" />

              {dateToday === getDatePost(item.date) && 
                (
                  <View style={{ position: 'absolute', width: 60, backgroundColor: '#Ec7C27', paddingVertical: 1, borderRadius: 6, top: 8, left: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#ffffff', fontWeight: '400' }}>HOJE</Text>
                  </View>
                )
              }

              {/* <ImageNews source={{ uri: item.content?.rendered }} resizeMode="cover" /> */}
            </ButtonDetailsNews>

            <DateNews>{formatDate(item?.date)}</DateNews>

            <TitleNews>{item?.title}</TitleNews>

            <ContentButtonLeadMore>
              <ButtonLeadMoreNews onPress={() => navigateToDetailNews(item.id)} activeOpacity={0.6}>
                <TextButtonLeadMoreNews>Ver mais</TextButtonLeadMoreNews>
                <Feather name="arrow-right" size={20} color="#Ec7C27" />
              </ButtonLeadMoreNews>
            </ContentButtonLeadMore>

          </CardNews>
        )}
      />

      <Portal>
        <Modalize
          ref={modalizeRef}
          // style={{ flex: 1 }}
          snapPoint={320}
          modalHeight={320}
          handlePosition="inside"
          HeaderComponent={
            <HeaderModalize>
              <TitleHeaderModalize>FILTRAR</TitleHeaderModalize>
            </HeaderModalize>
          }
          FooterComponent={
            <ContainerButtonCloseModalModilize>
              <ButtonCloseModalModalize onPress={closeModal} activeOpacity={0.7} >
                <TextButtonCloseModilize>Cancelar</TextButtonCloseModilize>
              </ButtonCloseModalModalize>
            </ContainerButtonCloseModalModilize>
          }
        >
          <ContainerModalize>
            <Text style={{ textAlign: 'center' }}>Em breve</Text>
          </ContainerModalize>
        </Modalize>
      </Portal>

    </Container>
  );
}

export default Home;