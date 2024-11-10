import React from 'react';
import styled from 'styled-components';

const LogoImage = styled.img`
  width: 233px;
  height: 60px;
`;

const HeaderComponent: React.FC = () => {
  return (
    <header className="bg-white h-16 flex">
      <div className="container flex justify-start items-center">
        <LogoImage src={'./logo-landit.svg'} alt="logo" />
      </div>
    </header>
  );
};

export default HeaderComponent;
