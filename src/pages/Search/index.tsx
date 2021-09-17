import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, Image, Alert, TextInputProps } from 'react-native';
import axios from 'axios';

// IMPORT API SERVER
import api from '../../services/api';

// import useDebouncePromise from '../../utils/useDebouncePromise';
import useDebounce from '../../utils/useDebounce';

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
  OrgContainer,
  Org,
  OrgInternContainer,
  OrgAvatarContainer,
  OrgAvatarImage,
  OrgContent,
  OrgTitle,
  OrgDescription,
  AreaButtons,
  ButtonSaveFavorityOrg,
  TextButtonSaveFavorityOrg,
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
  date?: string;
}

const Search: React.FC = () => {

  // const searchRef = useRef<any>(null);

  const [news, setsetNews] = useState<News[]>([]);
  const [searchValue, setSearchValue] = useState('');
  // const [isFavorite, setIsFavorite] = useState(false);

  // const debouncedPromise = useDebouncePromise(axios, 300);
  const { debounce } = useDebounce();

  async function loadNews(news: string): Promise<void> {
    try {
      if(!searchValue){
        return;
      }
      
    } catch (error) {
      setsetNews([]);
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
    setsetNews([]);
  }

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
      >
        <OrgContainer>
          {news.length > 0 ? (
            news.map(item => (

              <Org key={item.id}>
                <OrgInternContainer>
                  <OrgAvatarContainer>
                    <OrgAvatarImage source={{ uri: item.image }}/>
                  </OrgAvatarContainer>
                  <OrgContent>
                    <OrgTitle>{item.title?.rendered}</OrgTitle>
                    {/* <OrgDescription>{item.excerpt?.rendered}</OrgDescription> */}
                  </OrgContent>
                </OrgInternContainer>
                
                <AreaButtons>
                  {/* <ButtonSaveFavorityOrg onPress={() => toggleFavorite(item)} testID={`item-${item}`} isFavorite={isFavorite} activeOpacity={0.6}> */}
                    {/* {isFavorite ? <SalvoBrancoIcon width={20} height={20} /> : <SalvoAzulIcon width={20} height={20} /> } */}
                    {/* <TextButtonSaveFavorityOrg isFavorite={isFavorite}>{isFavorite ? 'Salvo' : 'Salvar'}</TextButtonSaveFavorityOrg> */}
                  {/* </ButtonSaveFavorityOrg> */}
                </AreaButtons>
              </Org>

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
                    Pesquise por notícias no{'\n'}<TextPlus>Blog do Ney Lima</TextPlus>!
                  </TextInfoMessageScreen>
                </InfoMessageScreen>
              )}
            </>
          )}
        </OrgContainer>
      </ScrollView>

    </Container>
  );
}

export default Search;