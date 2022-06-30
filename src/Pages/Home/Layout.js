import React, { useState } from "react";
import AddBillModal from "./AddBillModal";

const Layout = () => {
  const [addBillModal, setAddBillModal] = useState(null);

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
            <label
              htmlFor="add-bill-modal"
              className="btn modal-button"
              onClick={() => setAddBillModal(1)}
            >
              Add A New Bill
            </label>
            {addBillModal && <AddBillModal />}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
