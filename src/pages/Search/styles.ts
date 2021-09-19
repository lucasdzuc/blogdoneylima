import styled, { css } from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 64}px;
  background: #FFF;
`;

export const ContentInputSearch = styled.View`
  width: 100%;
  /* height: 60px; */
  padding: 0px 16px;
`;

export const ContentInput = styled.View`
  width: 100%;
  height: 60px;
  /* padding: 0px 16px; */
  background: #F4F4F4;
  border-radius: 14px;
  /* margin-bottom: 8px; */
  /* border-width: 2px; */
  /* border-color: #FFF; */
  flex-direction: row;
  align-items: center;
  
  /* ${css`
    shadow-color: #969696;
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.5;
    shadow-radius: 0;
    elevation: 5;
  `} */
`;

export const ButtonGoBack = styled.TouchableOpacity``;

export const TextInput = styled.TextInput`
  flex: 1;
  /* font-family: 'arimoregular'; */
  font-size: 16px;
  /* color: ${props => props.theme.colors.searchtextvalue}; */
`;

export const ButtonSearch = styled.TouchableOpacity``;

export const ContentCardNews = styled.View`
  padding: 8px 16px 0px;
`;

export const CardNews = styled.View`
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 14px;
  background: #F4F4F4;
`;

export const ImageNews = styled.Image`
  height: 100px;
  border-radius: 10px;
  background: #C4C4C4;
`;

export const DateNews = styled.Text`
  font-size: 14px;
  color: #858585;
  padding: 8px 0px;
`;

export const TitleNews = styled.Text`
  font-size: 18px;
  color: #000;
  /* font-weight: 500; */
  padding-bottom: 8px;
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

export const MessageOrgNameNotExist = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextMessageOrgNameNotExist = styled.Text`
  /* font-family: 'arimoregular'; */
  font-size: 16px;
  color: #858585;
  text-align: center;
`;

export const InfoMessageScreen = styled.View`
  flex: 1;
  margin-top: 80px;
  justify-content: center;
  align-items: center;
`;

export const TextInfoMessageScreen = styled.Text`
  /* font-family: 'arimoregular'; */
  font-size: 17px;
  color: #000;
  text-align: center;
  padding: 24px 0px;
`;

export const TextPlus = styled.Text`
  /* font-family: 'arimoregular'; */
  font-size: 17px;
  color: #Ec7C27;
  font-weight: 700;
  text-align: center;
`;