import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
// import axios from 'axios';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';

// import api from '../../services/api';

import formatDate from '../../utils/formatDate';

import {
  Container,
  ProductList,
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
  date?: string;
}

function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Home: React.FC = () => {

  const modalizeRef = useRef<Modalize>(null);

  const navigation = useNavigation();

  const [news, setNews] = useState<News[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // function getImage(value: string){
  //   // let valor = value;
  //   console.log(value);
  //   const url = location.href;
  //   // const match = url.match(/[^\/\\]+.jpg/);
  //   const match = url.match(value);
  //   console.log(match);
  //   return;
  // }

  const navigateToSearch = useCallback(() => {
    navigation.navigate('Search');
  }, []);

  const navigateToDetailNews = useCallback((newsId: number) => {
    navigation.navigate('DetailNews', { newsId });
  }, []);

  async function loadNews() {
    // const response = await api.get('https://blogdoneylima.com.br/wp-json/wp/v2/posts/');
    // console.log(response);
    // const data = response.json();
    // setNews(response);

    await fetch('https://blogdoneylima.com.br/wp-json/wp/v2/posts', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        const data = response.filter((res: any)  => res.title.rendered !== "<NO>" && res.title.rendered !== "<no>")
        setNews(
          data.map((item: News) => ({
            ...item,
            // image_url: getImage(item.content?.rendered)
          }))
        );
      }).catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadNews();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    loadNews();

    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const closeModal = () => {
    // setIdPost();
    modalizeRef.current?.close();
  }

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

      <ProductList
        data={news}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyExtractor={(item: News) => String(item.id)}
        contentContainerStyle={{
          // paddingVertical: 8,
          paddingHorizontal: 16,
        }}
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
        renderItem={({ item }: any) => (
          <CardNews>

            <ImageNews source={{ uri: item?.image_url }} />

            <DateNews>{formatDate(item.date)}</DateNews>

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
            <Text>Filtre por data</Text>
          </ContainerModalize>
        </Modalize>
      </Portal>

    </Container>
  );
}

export default Home;