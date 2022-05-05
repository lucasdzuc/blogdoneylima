import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {

    title: string;

    colors: {
      primary: string;

      secondary: string;

      terciary: string;

      iconColor: string;

      text: string,
      subtext: string,
      buttonprimary: string,
      buttonsecondary: string,
      background: string,

      searchinput: string,
      searchplaceholder: string,
      searchicon: string,
      searchtextvalue: string,

      card: string,
      cardname: string,
      carddescription: string,

      emptytext: string,

      carddash: string,

      cardlog: string,

      buttonCancelModal: string,
      textButtonCancelModal: string,
    };

  }
}
