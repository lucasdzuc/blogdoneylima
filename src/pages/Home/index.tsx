import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { Feather } from '@expo/vector-icons';

// import api from '../../services/api';

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
  formatDate(): void
}

const Home: React.FC = () => {

  const modalizeRef = useRef<Modalize>(null);

  const navigation = useNavigation();

  const [news, setNews] = useState<News[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  function getImage(value: any){
    const [match] = value.match(/https?:\/\/[^"]+\.(jpg|jpeg|png)/);
    // console.log(match);
    return match;
  };

  const navigateToSearch = useCallback(() => {
    navigation.navigate('Search');
  }, []);

  const navigateToDetailNews = useCallback((newsId: string) => {
    navigation.navigate('DetailNews', { newsId });
  }, []);

  async function loadNews() {
    if (loading) {
      return;
    }
    // if (total > 0 && news.length   === total) {
    //   return;
    // }

    setLoading(true);

    await fetch(`https://blogdoneylima.com.br/wp-json/wp/v2/posts?per_page=10&page=${page}`, {
      method: 'GET',  
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        const data = response.filter((res: any)  => res.title.rendered !== "<NO>" && res.title.rendered !== "<no>");
        // setNews([...news, ...data]);
        // setNews(data);
        // setTotal(1);
        setPage(page + 1);
        setNews([
          ...news,
          ...data.map((item: News) => ({
            ...item,
            image: getImage(item.content?.rendered)
          }))
        ]);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }
  
  useEffect(() => {
    loadNews();
  }, [page]);

  function wait(timeout: number) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    loadNews();

    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  function FooterList({ load }: any){
    if (!load) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size={24} color="#999591" />
      </View>
    )
  }

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    // setIdPost();
    modalizeRef.current?.close();
  };

  return (
    <Container>

      {/* <ContentCardNews>
        <Text>FEED</Text>
        {news?.map((newspost: News) => (
          <CardNews key={newspost.id}>
            <Text>{newspost.title?.rendered}</Text>
            <Text>{newspost.date}</Text>
          </CardNews>
        ))}
      </ContentCardNews>  */}

      <NewsListProvider
        data={news}
        keyExtractor={(item: News) => String(item.id)}
        onEndReached={loadNews}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          // paddingVertical: 8,
          paddingHorizontal: 16,
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

            <ImageNews source={{ uri: item?.image }} resizeMode="cover" />

            <DateNews>{formatDate(item?.date)}</DateNews>

            <TitleNews>{item.title?.rendered}</TitleNews>

            <ContentButtonLeadMore>
              <ButtonLeadMoreNews onPress={() => navigateToDetailNews(item.id)} activeOpacity={0.6}>
                <Feather name="arrow-right" size={20} color="#Ec7C27" />
                <TextButtonLeadMoreNews>Ver mais</TextButtonLeadMoreNews>
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
            <Text style={{ textAlign: 'center' }}>Filtre por data</Text>
          </ContainerModalize>
        </Modalize>
      </Portal>

    </Container>
  );
}

export default Home;