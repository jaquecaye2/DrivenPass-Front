import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useContext } from "react";
import Context from "../../Context/Context";
import axios from "axios";

import HeaderPage from "../shared/HeaderPage";
import Return from "../shared/Return";

import noteIcon from "../../assets/images/note-svgrepo-com.svg";
import credentialIcon from "../../assets/images/accessible.png";
import cardIcon from "../../assets/images/credit-cards.png";
import wifiIcon from "../../assets/images/wifi-svgrepo-com.svg";

function Item({type, item}) {

  let icon

  if(type === "credentials"){
    icon = credentialIcon
  } else if (type === "cards"){
    icon = cardIcon
  } else if (type === "notes"){
    icon = noteIcon
  } else if (type === "wifi"){
    icon = wifiIcon
  }

  return (
    <Link to={`/show-item/${type}/${item.id}`}>
      <Type>
        <div className="name">
          <img src={icon} />
          <h3>{item.title}</h3>
        </div>
      </Type>
    </Link>
  );
}

export default function List() {
  const { token } = useContext(Context);
  const { type } = useParams();

  const [data, setData] = React.useState([]);
  const [icon, setIcon] = React.useState("")

  const navigate = useNavigate();

  function renderizarItens() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(`https://drivenpass-jaquecaye.herokuapp.com/${type}`, config);

    promise
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        alert("Sessão expirada!")
        navigate("/signin");
      });
  }

  React.useEffect(() => {
    renderizarItens();
  }, []);

  let title;

  if (type === "credentials") {
    title = "Credenciais";
  } else if (type === "cards") {
    title = "Cartões";
  } else if (type === "notes") {
    title = "Notas";
  } else if (type === "wifi") {
    title = "Senhas de Wi-fi";
  }

  return (
    <PageStyle>
      <HeaderPage>{title}</HeaderPage>
      <div>
        {data.map((d, index) => (
          <Item key={index} type={type} item={d}/>
        ))}
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

  :hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
`;
