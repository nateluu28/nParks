import styled from "styled-components/native";

export const Header = styled.Text`
  font-weight: ${props => props.fontWeight || "700"};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : "60px")};
  color: ${props => props.color || "white"};
  text-align: ${props => props.textAlign || "left"};
  flex-wrap: wrap;
`;
