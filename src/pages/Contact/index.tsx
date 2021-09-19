import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { 
  Container,
  ContentWhatsApp,
  ButtonWhatsApp,
  TextButtonWhatsApp,
  ContentInstagram,
  ButtonInstagram,
  TextButtonInstagram,
  ContentFacebook,
  ButtonFacebook,
  TextButtonFacebook
} from './styles';

const Contact: React.FC = () => {

  const whatsapp = `whatsapp://send?phone=558189729790`;

  const instagram = 'https://instagram.com/blogdoneylima';

  // https://www.facebook.com/blogdoneylima
  // const facebook = 'fb://pages/blogdoneylima';

  function sendWhatsapp() {
    Linking.openURL(whatsapp);
  }

  function conectInstagram() {
    Linking.openURL(instagram);
  }

  // function conectFacebook() {
  //   Linking.openURL(facebook);
  // }

  return (
    <Container>

      <ContentWhatsApp>
        <ButtonWhatsApp onPress={sendWhatsapp} activeOpacity={0.6}>
          <FontAwesome5 name="whatsapp" size={25} color="#4caf50" />
          <TextButtonWhatsApp>WhatsApp</TextButtonWhatsApp>
        </ButtonWhatsApp>
      </ContentWhatsApp>

      <ContentInstagram>
        <ButtonInstagram onPress={conectInstagram} activeOpacity={0.6}>
          <AntDesign name="instagram" size={24} color="#aa30be" />
          <TextButtonInstagram>Instagram</TextButtonInstagram>
        </ButtonInstagram>
      </ContentInstagram>

      {/* <ContentFacebook>
        <ButtonFacebook onPress={conectFacebook} activeOpacity={0.6}>
          <SimpleLineIcons name="social-facebook" size={24} color="#3d91f2" />
          <TextButtonFacebook>Facebook</TextButtonFacebook>
        </ButtonFacebook>
      </ContentFacebook> */}

    </Container>
  );
}

export default Contact;