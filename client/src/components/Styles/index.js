import styled, { css } from 'styled-components';

export const SigninForm = styled.form`
`;

export const RegisterForm = styled.form`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 10px;
  justify-items: center;
  justify-content: center;  
`;

export const Input = styled.input`
  width: 250px;
  height: 30px;
  margin: 0 .25rem;
  min-width: 125px;
  border: 1px solid #eee;
  border-left: 3px solid;
  border-radius: 5px;
  transition: border-color .5s ease-out;

  :required {
    border-left-color: palegreen;
  }

  :optional {
    border-left-color: #999;
  }

  :invalid {
    border-left-color: salmon;
  }

  :required:focus:valid {
    background: url("/images/check.svg") no-repeat 95% 50%;
    background-size: 25px;
  }

  :focus:invalid {
    background: url("/images/tnt.svg") no-repeat 95% 50%;
    background-size: 25px;
  }
`;

export const Button = styled.button`
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
  }
  
  :disabled:hover {
    border-color: rgba(200,50,50,1);
  }

  @media all and (max-width:30em) {
    display:block;
    margin:0.2em auto;
  }
`;


