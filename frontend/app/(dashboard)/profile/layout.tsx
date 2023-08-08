import React, { ReactNode } from 'react';

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default CustomLayout;