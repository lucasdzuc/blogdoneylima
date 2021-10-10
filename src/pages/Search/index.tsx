import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, Image, Alert, TextInputProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

// IMPORT API SERVER
import api from '../../services/api';

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
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const [isFavorite, setIsFavorite] = useState(false);
  const { debounce } = useDebounce();

  function getImage(value: any){
    const [match] = value.match(/https?:\/\/[^"]+\.(jpg|jpeg|png)/);
    // console.log(match);
    return match;
  };

  async function loadNews(valueSearch: string): Promise<void> {
    try {
      if (!searchValue) {
        return;
      }
      setLoading(true);
      // search=${valueSearch}&context=view&type=post&per_page=10
      const response = await api.get(`/wp/v2/posts?search=${valueSearch}`, {
        params: {
          page,
          _per_page: 100,
          _context: "view",
          _type: "post",
          _post_type: "post",
          _subtype: "post",
        }
      });
      // setNews(response.data);
      setTotal(response.headers['x-wp-total']);
      setPage(page + 1);
      // const data = response.data.filter((res: any)  => res.title !== "<NO>" && res.title !== "<no>");
      setNews(
        response.data.map((item: News) => ({
          // ...item,
          id: item.id,
          title: item.title?.rendered,
          excerpt: item.excerpt?.rendered,
          image: getImage(item.content?.rendered),
          date: item.date,
        })).filter((res: any)  => res.title !== "<NO>" && res.title !== "<no>")
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      // setLoading(false);
      setNews([]);
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

  // console.log(news);

  return (
    <Container>
  
      <ContentInputSearch>
        <SearchInput
          value={searchValue}
          onChangeText={(text) => handleChange(text)}
          placeholder="Pesquisar notícia..."
          handleClearInput={handleClearInput}
          // handleSearch={() => loadNews(searchValue)}
        />
      </ContentInputSearch>

      <ScrollView
        style={{ flex: 1, backgroundColor: '#FFF' }}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingVertical: 8,
          // paddingHorizontal: 16,
        }}
      >
        <ContentCardNews>
          {news.length > 0 ? (
            news.map((item: any, index) => (
              <CardNews key={item.id}>

                <ImageNews source={{ uri: item?.image }} resizeMode="cover" />

                <DateNews>{formatDate(item?.date)}</DateNews>

                <TitleNews>{item?.title}</TitleNews>

                <ContentButtonLeadMore>
                  <ButtonLeadMoreNews onPress={() => navigateToDetailNews(item?.id)} activeOpacity={0.6}>
                    <Feather name="arrow-right" size={20} color="#Ec7C27" />
                    <TextButtonLeadMoreNews>Ver mais</TextButtonLeadMoreNews>
                  </ButtonLeadMoreNews>
                </ContentButtonLeadMore>

              </CardNews>
            ))
          ) : (
            <>
            {loading === true && searchValue.length > 0 ? (
              <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Pesquisando...</Text>
              </View>
            ) : (
              <>
              {searchValue.length > 0 && news.length === 0 && (
                <MessageOrgNameNotExist>
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
            </>
          )}
        </ContentCardNews>
      </ScrollView>

    </Container>
  );
}

export default Search;