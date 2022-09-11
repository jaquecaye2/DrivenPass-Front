import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import lock from "../../assets/images/lock-svgrepo-com.svg";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function canRenderHeader() {
    return !["/signin", "/signup"].includes(location.pathname);
  }

  function logout() {
    navigate("/signin");
  }

  return canRenderHeader() ? (
    <HeaderStyle>
      <Link to="/">
        <div>
          <img src={lock} />
          <h1>DrivenPass</h1>
        </div>
      </Link>
      <ion-icon name="log-out" onClick={logout}></ion-icon>
    </HeaderStyle>
  ) : null;
}

const HeaderStyle = styled.header`
  background-color: var(--cor-fundo);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  
  a {
    text-decoration: none;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: left;

    img {
      margin: 0 5px 0 15px;
      width: 50px;
    }

    h1 {
      font-size: 30px;
      color: var(--cor-detalhes);
    }
  }

  ion-icon {
    font-size: 30px;
    color: var(--cor-detalhes);
    margin-right: 15px;

    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;
