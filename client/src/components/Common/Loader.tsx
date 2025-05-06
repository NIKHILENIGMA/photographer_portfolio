import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="flex flex-row gap-2 w-full h-screen justify-center items-center mt-10">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
    </div>
  );
};

export default Loader;
