import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Modal from "react-modal";

import Button from "../shared/Button";
import Logo from "../shared/Logo";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [error, setError] = React.useState("")

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const navigate = useNavigate();

  function submitForm(event) {
    event.preventDefault();

    setDisabled(true);
    setLoading(true);

    if (confirmPassword === password) {
      const userData = {
        email,
        password,
      };

      const promise = axios.post("https://drivenpass-kmlu.onrender.com/signup", userData);

      promise
        .then((response) => {
          navigate("/signin");
        })
        .catch((error) => {
          setError(error.response.data)
          openModal()
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setDisabled(false);
          setLoading(false);
        });
    } else {
      setError("As senhas não conferem. Tente novamente!")
      openModal()
      setPassword("");
      setConfirmPassword("");
      setDisabled(false);
      setLoading(false);
    }
  }

  return (
    <>
      <Logo />
      <FormStyle onSubmit={submitForm}>
        <div className="input">
          <ion-icon name="person"></ion-icon>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
            required
          />
        </div>
        <div className="input">
          <ion-icon name="lock-closed"></ion-icon>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={disabled}
            required
          />
        </div>
        <div className="input">
          <ion-icon name="lock-closed"></ion-icon>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={disabled}
            required
          />
        </div>
        {loading ? (
          <Button disabled={disabled}>
            <ThreeDots color="#ffffff" height={45} width={80} />
          </Button>
        ) : (
          <Button disabled={disabled}>Cadastrar</Button>
        )}
      </FormStyle>
      <LinkEstilo>
        <Link to="/signin">
          <ion-icon name="return-down-back"></ion-icon>
          <p> Voltar </p>
        </Link>
      </LinkEstilo>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ModalEstilo>
          <p>
            {error}
          </p>
          <button onClick={closeModal}>Fechar</button>
        </ModalEstilo>
      </Modal>
    </>
  );
}

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div.input {
    width: 85%;
    border: 1px solid var(--cor-borda);
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 10px;

    ion-icon {
      padding: 5px;
      font-size: 30px;
      color: var(--cor-detalhes);
      margin: 0 5px;
    }

    input {
      width: 100%;
      height: 58px;
      border: none;
      color: var(--cor-texto);
      font-size: 18px;
      border-left: 1px solid var(--cor-borda);
      padding-left: 10px;
    }

    &::placeholder {
      color: var(--cor-texto);
    }
  }
`;

const LinkEstilo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--cor-texto);
    font-weight: 400;
    font-size: 15px;

    &:hover {
      text-decoration: underline;
    }

    ion-icon {
      font-size: 18px;
      margin-right: 7px;
    }
  }
`;

const ModalEstilo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

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

