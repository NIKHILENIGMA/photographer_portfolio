import { FC } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Main: FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-black font-sans">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
