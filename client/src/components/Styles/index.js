import styled from 'styled-components';

export const StyledSigninForm = styled.form`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  justify-items: center;
  justify-content: center;
  margin-top: 30vh;
`;

export const StyledRegisterForm = styled.form`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  justify-items: center;
  justify-content: center;
  margin-top: 30vh;
`;

export const StyledInput = styled.input`
  width: 250px;
  height: 30px;
  margin: 0 .25rem;
  min-width: 125px;
  border: 1px solid #eee;
  border-left: 3px solid;
  border-radius: 5px;
  transition: border-color .5s ease-out;
  align-self: center;
  justify-self: center;
  padding-left: 3px;

  :required {
    border-left-color: palegreen;
  }

  :optional {
    border-left-color: #999;
  }

  :invalid {
    border-left-color: salmon;
  }

  /* :required:focus:valid {
    background: url("/images/check.svg") no-repeat 95% 50%;
    background-size: 25px;
  }

  :focus:invalid {
    background: url("/images/tnt.svg") no-repeat 95% 50%;
    background-size: 25px;
  } */
`;

export const StyledButton = styled.button`
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255,255,255,0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  background-color: #EEE;
  color: #555;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align: center;
  transition: all 0.2s;

  :hover {
    border-color: rgba(30,200,30,1);
    cursor: pointer;
  }

  :disabled:hover {
    border-color: rgba(200,50,50,1);
    cursor: not-allowed;
  }

  @media all and (max-width:30em) {
    display:block;
    margin:0.2em auto;
  }
`;

export const StyledNavbar = styled.nav`
  height: 80px;
  width: 100%;
  font-size: 20px;
  background: transparent none repeat scroll 0% 0%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StyledNavUl = styled.ul`
  list-style: none;
  padding-left: 20px;
  
  display: flex;
  justify-content: flex-start;

  :not(:first-child) {
    justify-content: flex-end;
  }
`;

export const StyledNavLi = styled.li`
  font-weight: 600;
  color: #FFF;
  padding-right: 20px;

  a,
  a:visited,
  a:link,
  a:hover,
  a:active {
    color: #FFF;
    text-decoration: none;
  }

  a:hover {
    border-bottom: 2px solid white;
    padding-bottom: 5px;
  }
`;
