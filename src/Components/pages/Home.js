import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Context from "../../Context/Context";
import axios from "axios"

import HeaderPage from "../shared/HeaderPage";

import note from "../../assets/images/note-svgrepo-com.svg";
import credential from "../../assets/images/accessible.png";
import card from "../../assets/images/credit-cards.png";
import wifi from "../../assets/images/wifi-svgrepo-com.svg";

export default function Home() {
  const { token } = useContext(Context);

  const [typesLength, setTypesLength] = React.useState(0);

  const navigate = useNavigate();

  function getTypes() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get("http://localhost:5000/lengthTypes", config);

    promise
      .then((response) => {
        setTypesLength(response.data)
      })
      .catch((error) => {
        if(error.response.status === 401){
          navigate("/signin")
        }
      });
  }

  React.useEffect(() => {
    getTypes()
  }, [])

  return (
    <HomeStyle>
      <HeaderPage>Minhas senhas</HeaderPage>
      <div>
        <Link to="/list/credentials">
          <Type>
            <div className="name">
              <img src={credential} />
              <h3>Credenciais</h3>
            </div>
            <div className="quant">
              <p>{typesLength.credentials}</p>
            </div>
          </Type>
        </Link>
        <Link to="/list/notes">
          <Type>
            <div className="name">
              <img src={note} />
              <h3>Notas</h3>
            </div>
            <div className="quant">
              <p>{typesLength.notes}</p>
            </div>
          </Type>
        </Link>
        <Link to="/list/cards">
          <Type>
            <div className="name">
              <img src={card} />
              <h3>Cartões</h3>
            </div>
            <div className="quant">
              <p>{typesLength.cards}</p>
            </div>
          </Type>
        </Link>
        <Link to="/list/wifi">
          <Type>
            <div className="name">
              <img src={wifi} />
              <h3>Senhas de Wi-fi</h3>
            </div>
            <div className="quant">
              <p>{typesLength.wifi}</p>
            </div>
          </Type>
        </Link>
      </div>
      <Link to="/new-entry">
        <AddNew>
          <p>+</p>
        </AddNew>
      </Link>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  margin: 85px 0;
  a {
    text-decoration: none;
    color: var(--cor-texto);
  }
`;

const Type = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
  background-color: var(--cor-fundo);

  div.name {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      margin-right: 15px;
    }
    h3 {
      font-size: 17px;
      font-style: italic;
    }
  }

  div.quant {
    background-color: var(--cor-detalhes);
    width: 30px;
    height: 30px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 16px;
      color: var(--cor-fundo);
    }
  }

  :hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
`;

const AddNew = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--cor-detalhes);
  bottom: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  p {
    font-size: 25px;
    color: var(--cor-fundo);
  }

  :hover {
    filter: brightness(0.8);
    cursor: pointer;
  }
`;
