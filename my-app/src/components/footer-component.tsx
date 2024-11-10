import { Copy } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

const LogoImage = styled.img`
  width: 12px;
  height: 12px;
`;

const FooterWrapper = styled.footer`
  background: linear-gradient(
      0deg,
      rgba(0, 126, 108, 0.2),
      rgba(0, 126, 108, 0.2)
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
  background-blend-mode: overlay;
  width: 1920px;
  height: 50px;
`;

const FooterDiv = styled.div`
  width: 68px;
  height: 18px;
`;

const FooterDiv2 = styled.div`
  width: 140px;
  height: 18px;
`;

const FooterComponent: React.FC = () => {
  return (
    <FooterWrapper className="bg-black text-white py-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex ml-2">
          <FooterDiv>
            <div className="flex items-center">
              <div className="text-xs whitespace-nowrap">利用規約</div>
              <LogoImage
                src={'./logo-footer.svg'}
                alt="logo"
                className="ml-1"
              />
            </div>
          </FooterDiv>
          <FooterDiv2>
            <div className="flex items-center ml-2">
              <div className="text-xs whitespace-nowrap">
                プライバシーポリシー
              </div>
              <LogoImage
                src={'./logo-footer.svg'}
                alt="logo"
                className="ml-1"
              />
            </div>
          </FooterDiv2>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-xs">
            &copy; {new Date().getFullYear()} Landit Inc.
          </span>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default FooterComponent;
