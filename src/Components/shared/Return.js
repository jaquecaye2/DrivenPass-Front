import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Return({ children }) {
  return (
    <ReturnStyle>
      <ion-icon name="return-down-back"></ion-icon>
      <Link to={children}>
        <p> Voltar </p>
      </Link>
    </ReturnStyle>
  );
}

const ReturnStyle = styled.div`
  width: 100%;
  padding: 15px;
  background-color: var(--cor-fundo);
  position: fixed;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: left;
  z-index: 1;

  a {
    text-decoration: none;
    color: var(--cor-texto);
  }

  p {
    font-weight: 400;
    font-size: 17px;

    :hover {
      text-decoration: underline;
    }
  }

  ion-icon {
    font-size: 18px;
    margin: 7px;
  }
`;
