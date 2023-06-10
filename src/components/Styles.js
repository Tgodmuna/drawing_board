import styled, { createGlobalStyle } from "styled-components";
//canvas style
export const StyledCanvas = styled.canvas`
  box-shadow: 8px 10px 108px rgb(39 123 115);
  border: 3px solid #5a935c;
  resize: vertical;
  margin-top: 30px;
  border-radius: 20px;
  &:active{
    cursor: pointer;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ToolsDiv = styled(StyledDiv)`
  background-color: black;
  padding: 10px 100px;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`;
export const Div = styled(ToolsDiv)`
  display: flex;
  justify-content: space-between;
  /* background-color: transparent; */
`;
export const StyledInput = styled.input`
  padding: ${(prop) =>
    prop.type === "color" ? "0px 10px" : "2px 10px 2px 10px"};
  margin: 0px 20px;
`;
export const GlobalStyle = createGlobalStyle`
body{
    background: black;
    padding: 0px;
    margin: 0px;
}
`;

export const Button = styled.button`
  margin: 0px 5px 0px 5px;
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(39 123 115);
  color: black;

  &:hover {
    transition: color 2s, background-color 2s, text-transform 3s;
    color: limegreen;
    background-color: rgb(39 123 15);
    text-transform: uppercase;
    box-shadow: 1px 1px 5px rgb(30 100 150) ;
  }
`;
