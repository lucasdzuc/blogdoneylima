import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextInputProps, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// IMPORT DEBOUNCE
// import useDebounce from '../../utils/useDebounce';

import { Container, TextInput, IconLeft, IconRight, ButtonGoBack } from './styles';

interface InputProps extends TextInputProps {
  name?: string;
  handleClearInput(): void;
  handleSearch(): void;
}

interface InputRef {
  focus(): void;
}

const SearchInput: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { value = '', handleSearch, handleClearInput, ...rest }) => {

  const inputRef = useRef<any>(null);

  const { goBack } = useNavigation();

  // const [displayValue, setDisplayValue] = useState(value);
  // const debouncedChange = useDebounce(onChangeText, 300);

  const [isFocused, setIsFocused] = useState(true);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    inputRef?.current.focus();
  }, [inputRef?.current]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  const navigateBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <Container isFocused={isFocused}>
      <ButtonGoBack onPress={navigateBack} activeOpacity={0.8}>
        <IconLeft 
          name="arrow-left"
          size={22}
          // color="#858585" 
          color={isFocused || isFilled ? '#Ec7C27' : '#858585'}
          />
      </ButtonGoBack>

      <TextInput
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        placeholderTextColor="#858585"
        keyboardAppearance="dark"
        testID="search-input"
        {...rest}
      />
      
      {/* {value.length > 0 && (
        Platform.OS !== 'ios' && (
          <IconRight
            name="x" 
            size={22}
            color={isFocused || isFilled ? '#Ec7C27' : '#858585'}
            onPress={handleClearInput}
          />
        )
      )} */}
      <IconRight
        name="search"
        size={22}
        color={isFocused || isFilled ? '#Ec7C27' : '#858585'}
        onPress={handleSearch}
      />
    </Container>
  );
};

export default SearchInput;