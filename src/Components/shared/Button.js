import styled from "styled-components";

export default function Button({ children }) {
  return (
    <ButtonEstilo>
      <button type="submit">{children}</button>
    </ButtonEstilo>
  );
}

const ButtonEstilo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 46px;
    margin-top: 20px;
    background-color: var(--cor-detalhes);
    color: var(--cor-fundo);
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;
