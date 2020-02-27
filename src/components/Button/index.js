import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Flex } from "@houseme-networks/rental-primitives";

const ButtonContainer = styled(Flex)`
  background: #5ca4ff;
  box-shadow: 0px 0px 5px black;
  shadow-opacity: 0.5;
  border-radius: 7px;
  font-family: SFProDisplay-Bold;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0.11px;
  text-align: center;
  height: 55px;
  margin-bottom: 10px;
`;
const ButtonText = styled.Text`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: white;
`;

export const Button = ({
  buttonText,
  onPress,
  buttonProps,
  textProps,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonContainer
        {...buttonProps}
        {...rest}
        alginItems={"center"}
        justifyContent={"center"}
      >
        {buttonText ? (
          <ButtonText {...textProps}>{buttonText}</ButtonText>
        ) : (
          { children }
        )}
      </ButtonContainer>
    </TouchableOpacity>
  );
};
