import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, Image, Alert, TextInputProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
// import axios from 'axios';

// IMPORT API SERVER
// import api from '../../services/api';

// import useDebouncePromise from '../../utils/useDebouncePromise';
import useDebounce from '../../utils/useDebounce';
import formatDate from '../../utils/formatDate';

// IMPORT COMPONENTS
import SearchInput from '../../components/SearchInput';

// IMPORT IMAGES
// import ImageInfoSearch from '../../assets/images/info-search.svg';

// IMPORT STYLES OF SCREEN
import {
  Container,
  ContentInputSearch,
  ContentInput,
  ButtonGoBack,
  TextInput,
  ButtonSearch,
  ContentCardNews,
  CardNews,
  ImageNews,
  DateNews,
  TitleNews,
  ContentButtonLeadMore,
  ButtonLeadMoreNews,
  TextButtonLeadMoreNews,
  MessageOrgNameNotExist,
  TextMessageOrgNameNotExist,
  InfoMessageScreen,
  TextInfoMessageScreen,
  TextPlus
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

const Search: React.FC = () => {

  const navigation = useNavigation();

  // const searchRef = useRef<any>(null);

  const [news, setNews] = useState<News[]>([]);
  const [searchValue, setSearchValue] = useState('');
  // const [isFavorite, setIsFavorite] = useState(false);
  const { debounce } = useDebounce();

  function getImage(value: any){
    const [match] = value.match(/https?:\/\/[^"]+\.(jpg|jpeg|png)/);
    // console.log(match);
    return match;
  };

  async function loadNews(news: string): Promise<void> {
    try {
      if (!searchValue) {
        return;
      }

      await fetch(`https://www.blogdoneylima.com.br/wp-json/wp/v2/posts`, {
        method: "GET"
      })
      .then(response => response.json())
      .then(response => {
        const data = response.filter((res: any)  => res.title.rendered !== "<NO>" && res.title.rendered !== "<no>");
        setNews(
          data.map((item: News) => ({
            ...item,
            image: getImage(item.content?.rendered)
          }))
        );
      });

    } catch (error) {
      setNews([]);
      console.log(error);
      // eslint-disable-next-line no-console
    }
  }

  function handleChange(value: string) {
    setSearchValue(value);
    debounce(function () {
      loadNews(value);
    }, 300)
  };

  const handleClearInput = () => {
    setSearchValue('');
    setNews([]);
  };

  const navigateToDetailNews = useCallback((newsId: number) => {
    navigation.navigate('DetailNews', { newsId });
  }, []);

  return (
    <Container>

      <ContentInputSearch>
        <SearchInput
          value={searchValue}
          onChangeText={(text) => handleChange(text)}
          placeholder="Pesquisar notícias..."
          handleClearInput={handleClearInput}
        />
      </ContentInputSearch>

      <ScrollView
        style={{ flex: 1, backgroundColor: '#FFF' }}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingVertical: 16,
          // paddingHorizontal: 16,
        }}
      >
        <ContentCardNews>
          {news.length > 0 ? (
            news.map(item => (

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

            ))
          ) : (
            <>
              {searchValue.length > 0 && news.length === 0 && (
                <MessageOrgNameNotExist>
                  {/* <EmojiTristeIcon width={20} height={20} /> */}
                  <TextMessageOrgNameNotExist>Não encontramos notícias com este nome!</TextMessageOrgNameNotExist>
                </MessageOrgNameNotExist>
              )}
              {searchValue.length === 0 && news.length === 0 && (
                <InfoMessageScreen>
                  {/* <ImageInfoSearch width={200} height={200} /> */}
                  <TextInfoMessageScreen>
                    Pesquise por notícias no{'\n'}<TextPlus>Blog do Ney Lima</TextPlus>
                  </TextInfoMessageScreen>
                </InfoMessageScreen>
              )}
            </>
          )}
        </ContentCardNews>
      </ScrollView>

    </Container>
  );
}

export default Search;