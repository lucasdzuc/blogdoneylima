import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #FFF;
`;

export const NewsList = styled(FlatList)``;

export const HeaderList = styled.View`
  /* flex: 1; */
  /* width: 100%; */
  /* height: 100%; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonRedirectSearch = styled.TouchableOpacity`
  width: 78%;
  height: 64px;
  padding: 0px 24px;
  border-radius: 14px;
  background: #F4F4F4;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextButtonRedirectSearch = styled.Text`
  font-size: 16px;
  color: #858585;
`;

export const ButtonFilter= styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: #F4F4F4;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContentCardNews = styled.View`
  padding: 0px 16px;
`;

export const CardNews = styled.View`
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 14px;
  background: #F4F4F4;
`;

export const ImageNews = styled.Image`
  height: 100px;
  border-radius: 10px;
  background: #C4C4C4;
`;

export const TitleNews = styled.Text`
  font-size: 18px;
  color: #000;
  /* font-weight: 500; */
  padding-bottom: 16px;
`;

export const DateNews = styled.Text`
  color: #858585;
  padding: 8px 0px;
`;

export const ContentButtonLeadMore = styled.View`
  padding: 8px 0px;
`;

export const ButtonLeadMoreNews = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const TextButtonLeadMoreNews = styled.Text`
  font-size: 14px;
  color: #Ec7C27;
  font-weight: 700;
  padding: 0px 4px;
`;

export const ContainerModalize = styled.View`
  flex: 1;
`;

export const HeaderModalize = styled.View`
  padding: 32px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TitleHeaderModalize = styled.Text`
  font-size: 15px;
  color: #Ec7C27;
  font-weight: 700;
`;

export const ContainerButtonCloseModalModilize = styled.View`
  width: 100%;
  padding: 0px 16px 16px;
`;

export const ButtonCloseModalModalize = styled.TouchableOpacity`
  /* flex: 1; */
  width: 100%;
  height: 56px;
  margin-top: 16px;
  /* margin: 0px 24px; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #f3f4f6;
`;

export const TextButtonCloseModilize = styled.Text`
    /* font-family: 'gilroyregular'; */
    font-size: 16px;
    font-weight: 700;
    color: #464646;
  /* padding: 24px 0px; */
`;