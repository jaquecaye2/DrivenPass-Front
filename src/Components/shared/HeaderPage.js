import styled from "styled-components";

export default function HeaderPage({ children }) {
  return <TitlePage><h2>{children}</h2></TitlePage>;
}

const TitlePage = styled.div`
  height: 50px;
  background-color: var(--cor-detalhes);
  display: flex;
  align-items: center;
  padding-left: 15px;

  h2 {
    color: var(--cor-fundo);
    font-size: 18px;
    font-weight: bold;
  }
`;