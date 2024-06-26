import React, { useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import Home from "../../../pages/Home";
import DiscoverPage from "../../../pages/DiscoverPage";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

export default function HomeLayout() {
  const [activeComponent, setActiveComponent] = useState("Home");
  const [items, setItems] = useState([]);

  const handleSelectPage = (page_name) => {
    setActiveComponent(page_name);
    setItems(items);
  };

  function handleWhichActive(page_name) {
    switch (page_name) {
      case "Home":
        return (
          <Home
            handleSelectPage={handleSelectPage}
            activeComponent={activeComponent}
          />
        );

      case "Discover":
        return <DiscoverPage />;
      default:
        return (
          <Home
            handleSelectPage={handleSelectPage}
            activeComponent={activeComponent}
          />
        );
    }
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar
          handleSelectPage={handleSelectPage}
          activeComponent={activeComponent}
        />
      </div>

      <div className="col-span-10 bg-gradient h-full">
        <div className="sticky top-0 right-0 w-full">
          <Header />
        </div>
        <div>{handleWhichActive(activeComponent)}</div>

        <div>{/* <Footer /> */}</div>
      </div>
    </div>
  );
}
