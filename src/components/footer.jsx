import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #ff9900;
  color: white;
  padding: 15px;
  text-align: center;
  height:7vh;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;