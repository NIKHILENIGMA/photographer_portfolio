import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl my-8 ">
      {children}
    </div>
  );
};

export default Container;
