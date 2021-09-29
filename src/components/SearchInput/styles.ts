import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  /* flex: 1; */
  width: 100%;
  height: 60px;
  padding: 0px 0px 0px 0px;
  background: #F4F4F4;
  border-radius: 14px;
  border-color: #F4F4F4;
  border-width: 2px;
  flex-direction: row;
  align-items: center;
  /* ${css`
    shadow-color: #969696;
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.2;
    shadow-radius: 0;
    elevation: 3;
  `} */
  ${props =>
    props.isFocused &&
    css`
      border-color: #Ec7C27;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  /* font-family: 'arimoregular'; */
  font-size: 16px;
  color: #000;
`;

export const IconLeft = styled(Feather)`
  margin: 0px 24px;
`;

export const IconRightExtra = styled(Feather)`
  /* margin: 0px 16px; */
  padding: 4px;
  /* background: lightskyblue; */
`;

export const IconRight = styled(Feather)`
  margin: 0px 24px 0px 8px;
  padding: 4px;
  /* background: lightgreen; */
`;

export const ButtonGoBack = styled.TouchableOpacity``;

export const ButtonSearch = styled.TouchableOpacity``;