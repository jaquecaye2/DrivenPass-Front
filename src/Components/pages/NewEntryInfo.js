import styled from "styled-components";
import React from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import axios from "axios";
import Modal from "react-modal";

import HeaderPage from "../shared/HeaderPage";
import Return from "../shared/Return";
import Button from "../shared/Button";

export default function NewEntryInfo() {
  const navigate = useNavigate();
  const { token } = useContext(Context);
  const { type } = useParams();

  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [user_name, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [note, setNote] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [name, setName] = React.useState(""); // nome no cartão
  const [security_code, setCVC] = React.useState("");
  const [expiration_date, setExpiration] = React.useState("");
  const [isVirtual, setIsVirtual] = React.useState(false);
  const [typeCard, setTypeCard] = React.useState("");
  const [name_wifi, setNameWifi] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
  }

  function submitForm(event) {
    event.preventDefault();

    setDisabled(true);
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let data = {};

    if (type === "credentials") {
      data = {
        title,
        url,
        user_name,
        password,
      };
    } else if (type === "notes") {
      data = {
        title,
        note,
      };
    } else if (type === "cards") {
      data = {
        title,
        number,
        name,
        security_code,
        expiration_date,
        password,
        isVirtual,
        type: typeCard,
      };
    } else if (type === "wifi") {
      data = {
        title,
        name_wifi,
        password,
      };
    }

    const promise = axios.post(`https://drivenpass-jaquecaye.herokuapp.com/${type}`, data, config);

    promise
      .then((response) => {
        openModal();
        setDisabled(false);
        setLoading(false);
        setTitle("");
        setUrl("");
        setUserName("");
        setPassword("");
        setNote("");
        setNumber("");
        setName("");
        setCVC("");
        setExpiration("");
        setIsVirtual(false);
        setTypeCard("");
        setNameWifi("");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          openModal();
          navigate("/");
        }
        setError(error.response.data);
        openModal();
        setDisabled(false);
        setLoading(false);
      });
  }

  return (
    <PageStyle>
      <HeaderPage>Informe os dados abaixo:</HeaderPage>
      <FormStyle onSubmit={submitForm}>
        {type === "credentials" ? (
          <>
            <div>
              <label for="title">
                <h3>Título</h3>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="url">
                <h3>URL</h3>
              </label>
              <input
                type="text"
                name="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="name">
                <h3>Nome de usuário</h3>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={user_name}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="password">
                <h3>Senha</h3>
              </label>
              <input
                type="text"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        ) : null}

        {type === "notes" ? (
          <>
            <div>
              <label for="title">
                <h3>Título</h3>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="note">
                <h3>Anotação</h3>
              </label>
              <input
                type="text"
                name="note"
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
              />
            </div>
          </>
        ) : null}

        {type === "cards" ? (
          <>
            <div>
              <label for="title">
                <h3>Título</h3>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="number">
                <h3>Número do cartão</h3>
              </label>
              <input
                type="text"
                name="number"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="name">
                <h3>Nome no cartão</h3>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="cvc">
                <h3>Código de segurança</h3>
              </label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                value={security_code}
                onChange={(e) => setCVC(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="date">
                <h3>Data de expiração</h3>
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={expiration_date}
                onChange={(e) => setExpiration(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="password">
                <h3>Senha do cartão</h3>
              </label>
              <input
                type="text"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="virtual">
                <h3>É virtual?</h3>
              </label>
              <input
                type="text"
                name="virtual"
                id="virtual"
                value={isVirtual}
                onChange={(e) => setIsVirtual(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="type">
                <h3>Tipo do cartão</h3>
              </label>
              <input
                type="text"
                name="type"
                id="type"
                value={typeCard}
                onChange={(e) => setTypeCard(e.target.value)}
                required
              />
            </div>
          </>
        ) : null}

        {type === "wifi" ? (
          <>
            <div>
              <label for="title">
                <h3>Título</h3>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="name">
                <h3>Nome da rede</h3>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name_wifi}
                onChange={(e) => setNameWifi(e.target.value)}
                required
              />
            </div>
            <div>
              <label for="password">
                <h3>Senha da rede</h3>
              </label>
              <input
                type="text"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        ) : null}

        {loading ? (
          <Button disabled={disabled}>
            <ThreeDots color="#ffffff" height={45} width={80} />
          </Button>
        ) : (
          <Button disabled={disabled}>Cadastrar Item</Button>
        )}
      </FormStyle>
      <Return>{"/new-entry"}</Return>
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
              <p>Item criado com sucesso</p>
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
`;

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;

  div {
    width: 85%;
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    margin-bottom: 10px;

    h3 {
      font-size: 18px;
      font-style: italic;
      margin-bottom: 7px;
    }

    input {
      width: 100%;
      height: 40px;
      border: 1px solid var(--cor-borda);
      border-radius: 10px;
      color: var(--cor-texto);
      font-size: 18px;
      padding-left: 10px;
      margin-bottom: 15px;
    }

    &::placeholder {
      color: var(--cor-texto);
    }
  }
`;

const ModalEstilo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ion-icon {
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
