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

export const OrgContainer = styled.View`
  /* flex: 1; */
  margin-top: 16px;
  padding: 0px 16px;
`;

export const Org = styled.View`
  /* display: flex; */
  /* flex: 1; */
  /* width: 100%; */
  padding: 14px;
  flex-direction: column;
  /* align-items: center; */
  /* background: ${props => props.theme.colors.card}; */
  border-radius: 14px;
  margin-bottom: 16px;
  
  /* ${css`
    shadow-color: #969696;
    shadow-offset: {width: 0, height: 4};
    shadow-opacity: 0.5;
    elevation: 5;
  `} */
`;

export const OrgInternContainer = styled.View`
  flex-direction: row;
`;

export const OrgAvatarContainer = styled.View``;

export const OrgAvatarImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const OrgContent = styled.View`
  flex: 1;
  padding: 0px 12px 14px;
  flex-wrap: nowrap;
  /* background: lightgreen; */
`;

export const OrgTitle = styled.Text`
  /* font-family: 'arimomedium'; */
  font-size: 16px;
  /* color: ${props => props.theme.colors.cardname}; */
  font-weight: 700;
`;

export const OrgDescription = styled.Text`
  /* font-family: 'arimoregular'; */
  font-size: 16px;
  /* color: ${props => props.theme.colors.carddescription}; */
`;

export const AreaButtons = styled.View`
  align-items: flex-end;
`;

export const ButtonSaveFavorityOrg = styled.TouchableOpacity`
  height: 32px;
  padding: 0px 16px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background: rgba(33, 150, 243, 0.1); */
  /* ${(props: { isFavorite: boolean; }) => props.isFavorite && 
    css`
      background: #Ec7C27;
    `
  } */
`;

export const TextButtonSaveFavorityOrg = styled.Text`
  /* font-family: 'arimomedium'; */
  font-size: 16px;
  color: #Ec7C27;
  padding: 0px 4px;
  /* ${(props: { isFavorite: boolean; }) => props.isFavorite &&
    css`
      color: #FFF;
    `
  } */
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