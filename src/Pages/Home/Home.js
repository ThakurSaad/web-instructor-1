import React from "react";
import Layout from "./Layout";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="px-4">
        <Layout />
      </section>
    </div>
  );
};

export default Home;
