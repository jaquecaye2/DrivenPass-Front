import styled from "styled-components"

import lock from "../../assets/images/lock-svgrepo-com.svg"

export default function Logo() {
  return (
    <LogoStyle>
      <img src={lock}/>
      <h1>DrivenPass</h1>
    </LogoStyle>
  );
}

const LogoStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 70px 0;

    img{
        width: 90px;
        margin-bottom: 20px;
    }

    h1{
        color: var(--cor-detalhes);
        font-size: 30px;
    }
`


