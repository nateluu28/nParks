import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Flex } from "@houseme-networks/rental-primitives";
import { useDarkMode } from "react-native-dark-mode";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";

const ButtonContainer = styled(Flex)`
  background: ${(props) =>
    props.disabled ? "grey" : props.isDarkMode ? "white" : "black"};
  box-shadow: 0px 0px 5px black;
  shadow-opacity: 0.5;
  border-radius: 3px;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0.11px;
  text-align: center;
  height: ${(props) => (props.isSetting ? "32px" : "55px")};
  margin-bottom: 10px;
`;
const ButtonText = styled.Text`
  font-weight: 700;
  font-size: ${(props) => (props.isSetting ? "16px" : "20px")};
  text-align: center;
  color: ${(props) =>
    props.disabled ? "darkgrey" : props.isDarkMode ? "black" : "white"};
`;

const defaultRegex = /(\[.*\]\s)(.*)./gi;

export const Button = ({
  buttonText,
  onPress,
  buttonProps,
  textProps,
  children,
  setting,
  disabled,
  regex = defaultRegex,
  ...rest
}) => {
  const isDarkMode = useDarkMode();
  const [waiting, setWaiting] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        const onButtonPress = async () => {
          await setWaiting(true);
          try {
            await onPress();
          } catch (err) {
            console.log(JSON.stringify(err));
            Alert.alert(err.message.replace(defaultRegex, "$2"));
          } finally {
            await setWaiting(false);
          }
        };
        onButtonPress();
      }}
      disabled={disabled}
    >
      <ButtonContainer
        isDarkMode={isDarkMode}
        isSetting={setting}
        {...buttonProps}
        {...rest}
        alginItems={"center"}
        disabled={disabled}
        justifyContent={"center"}
      >
        {waiting ? (
          <ActivityIndicator />
        ) : buttonText ? (
          <ButtonText
            isDarkMode={isDarkMode}
            isSetting={setting}
            disabled={disabled}
            {...textProps}
          >
            {buttonText}
          </ButtonText>
        ) : (
          { children }
        )}
      </ButtonContainer>
    </TouchableOpacity>
  );
};
