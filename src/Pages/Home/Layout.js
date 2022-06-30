import React from "react";

const Layout = () => {
  return (
    <main>
      <section className="header flex justify-between bg-base-200 p-4">
        <div className="header-start">Logo</div>
        <div className="header-end">Paid Total : </div>
      </section>
      <section className="body bg-base-200 lg:mx-8 my-4">
        <div className="table-control grid grid-cols-3 items-center p-4">
          <div>
            <p>Billings</p>
          </div>
          <div>
            <input
              placeholder="Search"
              type="search"
              name="search"
              className="rounded-md p-2"
            />
          </div>
          <div>
            <button className="btn">Add A New Bill</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
