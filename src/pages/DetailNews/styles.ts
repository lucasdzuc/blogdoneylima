import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #FFFFFF;
`;

export const CardNews = styled.View`
  padding: 12px;
  border-radius: 14px;
  background: #F4F4F4;
`;

export const ImageNews = styled.Image`
  /* height: 100px; */
  border-radius: 10px;
  background: #C8C8C8;
`;

export const DateNews = styled.Text`
  font-size: 14px;
  color: #858585;
  padding-top: 8px;
`;

export const TitleNews = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  /* text-align: justify; */
  padding: 16px 0px;
`;

export const TextContentNews = styled.Text`
  font-size: 16px;
  color: #858585;
  letter-spacing: 0.6px;
  text-align: justify;
  line-height: 24px;
`;
