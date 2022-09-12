import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Context from "../../Context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

import HeaderPage from "../shared/HeaderPage";
import Return from "../shared/Return";

function RowTable({ row, item }) {
  const collum = row[1];

  if(item[collum] === true){
    item[collum] = "true"
  } else if(item[collum] === false){
    item[collum] = "false"
  }

  return (
    <tr>
      <td className="nameItem">{row[0]}</td>
      <td>{item[collum]}</td>
    </tr>
  );
}

export default function ShowItem() {
  const navigate = useNavigate();

  const { token } = useContext(Context);
  const { id } = useParams();
  const { type } = useParams();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-15%",
      transform: "translate(-50%, -50%)",
      border: "1px solid var(--cor-detalhes)",
      borderRadius: "10px",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    navigate("/")
  }

  const infoCredentials = [
    ["URL", "url"],
    ["Nome de usuário", "user_name"],
    ["Senha", "password"],
  ];
  const infoNotes = [["Anotação", "note"]];
  const infoCards = [
    ["Número", "number"],
    ["Nome", "name"],
    ["Código de segurança", "security_code"],
    ["Data de expiração", "expiration_date"],
    ["Senha", "password"],
    ["É virtual?", "isVirtual"],
    ["Tipo", "type"],
  ];
  const infoWifi = [
    ["Nome da rede", "name_wifi"],
    ["Senha", "password"],
  ];

  const [data, setData] = React.useState([]);

  let title;
  let rowsTable = [];

  if (type === "credentials") {
    title = "Credenciais";
    rowsTable = infoCredentials;
  } else if (type === "cards") {
    title = "Cartões";
    rowsTable = infoCards;
  } else if (type === "notes") {
    title = "Notas";
    rowsTable = infoNotes;
  } else if (type === "wifi") {
    title = "Senhas de Wi-fi";
    rowsTable = infoWifi;
  }

  function renderizarItem() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `https://drivenpass-jaquecaye.herokuapp.com/${type}/?id=${id}`,
      config
    );

    promise
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert("Sessão expirada!");
        navigate("/signin");
      });
  }

  function deleteItem(){
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.delete(
      `https://drivenpass-jaquecaye.herokuapp.com/${type}/${id}`,
      config
    );

    promise
      .then((response) => {
        openModal();
      })
      .catch((error) => {
        if(error.response.status === 401){
          openModal()
          navigate("/")
        }
        setError(error.response.data);
        openModal();
      });
  }

  React.useEffect(() => {
    renderizarItem();
  }, []);

  return (
    <PageStyle>
      <HeaderPage>
        {title} {">"} {data.title}
      </HeaderPage>
      <TableInfo>
        {rowsTable.map((row, index) => (
          <RowTable key={index} row={row} item={data} />
        ))}
      </TableInfo>
      <Delete onClick={deleteItem}>
        <ion-icon name="close-circle"></ion-icon>
      </Delete>
      <Return>{`/list/${type}`}</Return>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ModalEstilo>
          {error ? (
            <>
              <ion-icon name="sad"></ion-icon>
              <p>{error}</p>
            </>
          ) : (
            <>
              <ion-icon name="happy"></ion-icon>
              <p>Item deletado com sucesso!</p>
            </>
          )}
          <button onClick={closeModal}>Voltar</button>
        </ModalEstilo>
      </Modal>
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

const TableInfo = styled.table`
  width: 90%;
  margin: 30px auto;
  border: 1px solid var(--cor-borda);

  td {
    padding: 5px 15px;
    border: 1px solid var(--cor-borda);
    text-align: center;
    height: 50px;
    vertical-align: middle;
  }

  td.nameItem {
    font-weight: bold;
  }
`;

const Delete = styled.div`
  background-color: var(--cor-fundo);
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  ion-icon {
    font-size: 60px;
    color: red;

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;

const ModalEstilo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ion-icon{
    font-size: 30px;
    color: var(--cor-detalhes);
  }

  h4 {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  p {
    line-height: 25px;
    text-align: center;

    span {
      font-weight: 200;
    }
  }

  button {
    width: 50%;
    height: 30px;
    margin-top: 20px;
    background-color: var(--cor-detalhes);
    color: var(--cor-fundo);
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

