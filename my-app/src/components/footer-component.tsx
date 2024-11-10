import { Copy } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
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
              <Copy className="ml-1 text-gray-500 w-3 h-3" />
            </div>
          </FooterDiv>
          <FooterDiv2>
            <div className="flex items-center">
              <div className="text-xs whitespace-nowrap">
                プライバシーポリシー
              </div>
              <Copy className="ml-1 text-gray-500 w-3 h-3" />
            </div>
          </FooterDiv2>
        </div>
        <div>
          <span className="mr-2 text-xs">
            &copy; {new Date().getFullYear()} Landit Inc.
          </span>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default FooterComponent;
