// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="flex justify-between items-center w-full">
        <div className="ml-2">
          <a href="/terms" className="mx-2">
            利用規約
          </a>
          <a href="/privacy" className="mx-2">
            プライバシーポリシー
          </a>
        </div>
        <div>
          <span className="mr-2">
            &copy; {new Date().getFullYear()} Landit Inc.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
