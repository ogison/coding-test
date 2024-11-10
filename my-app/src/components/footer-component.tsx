import { Copy } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 1920px;
  height: 50px;
`;

const FooterComponent: React.FC = () => {
  return (
    <FooterWrapper className="bg-black text-white py-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex ml-2">
          <a href="/terms" className="mx-2">
            利用規約
          </a>
          <Copy className="text-gray-500" />
          <a href="/privacy" className="mx-2">
            プライバシーポリシー
          </a>
          <Copy className="text-gray-500" />
        </div>
        <div>
          <span className="mr-2">
            &copy; {new Date().getFullYear()} Landit Inc.
          </span>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default FooterComponent;
