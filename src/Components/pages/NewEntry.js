import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import HeaderPage from "../shared/HeaderPage";
import Return from "../shared/Return";

import noteIcon from "../../assets/images/note-svgrepo-com.svg";
import credentialIcon from "../../assets/images/accessible.png";
import cardIcon from "../../assets/images/credit-cards.png";
import wifiIcon from "../../assets/images/wifi-svgrepo-com.svg";

export default function NewEntry() {
  return (
    <PageStyle>
      <HeaderPage>Escolha a categoria:</HeaderPage>
      <div>
        <Link to="/new-entry-info/credentials">
          <Type>
            <div className="name">
              <img src={credentialIcon} />
              <h3>Credenciais</h3>
            </div>
          </Type>
        </Link>
        <Link to="/new-entry-info/notes">
          <Type>
            <div className="name">
              <img src={noteIcon} />
              <h3>Notas</h3>
            </div>
          </Type>
        </Link>
        <Link to="/new-entry-info/cards">
          <Type>
            <div className="name">
              <img src={cardIcon} />
              <h3>Cartões</h3>
            </div>
          </Type>
        </Link>
        <Link to="/new-entry-info/wifi">
          <Type>
            <div className="name">
              <img src={wifiIcon} />
              <h3>Wifi</h3>
            </div>
          </Type>
        </Link>
      </div>
      <Return>{"/"}</Return>
    </PageStyle>
  );
}

const PageStyle = styled.div`
  margin: 85px 0;
  a {
    text-decoration: none;
    color: var(--cor-texto);
  }
`;

const Type = styled.div`
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  padding: 20px 15px;
  background-color: var(--cor-fundo);
  border: 1px solid var(--cor-borda);

  div.name {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 40px;
      margin-right: 15px;
    }
    h3 {
      font-size: 17px;
      font-style: italic;
    }
  }

  :hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
`;
