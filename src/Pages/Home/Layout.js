import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import AddBillModal from "./AddBillModal";
import BillingRow from "./BillingRow";

const Layout = () => {
  // const [billingList, setBillingList] = useState([]);
  const [addBillModal, setAddBillModal] = useState(null);
  const [submitMethod, setSubmitMethod] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetch("http://localhost:5000/billing-count")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPageCount(Math.ceil(data.billingCount / 10));
      });
  }, [page, pageSize]);

  const {
    data: billingList,
    isLoading,
    refetch,
  } = useQuery(["billing-list", page, pageSize], () =>
    fetch(
      `http://localhost:5000/billing-list?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

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
              onClick={() => {
                setAddBillModal(1);
                setSubmitMethod("POST");
              }}
            >
              Add A New Bill
            </label>
            {addBillModal && <AddBillModal submitMethod={submitMethod} />}
          </div>
        </div>
      </section>
      {/* bill-management-table */}
      <section className="bill-management-table lg:mx-8">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Billing Id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Paid Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {billingList.map((billingSingle, index) => (
                <BillingRow
                  key={index}
                  index={index}
                  billingSingle={billingSingle}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons flex justify-center mb-20">
            {[...Array(pageCount).keys()].map((number, index) => (
              <button
                key={index}
                className={
                  page === number
                    ? "selected btn btn-primary rounded-sm mr-1"
                    : "btn btn-primary rounded-sm mr-1"
                }
                onClick={() => setPage(number)}
              >
                {number + 1}
              </button>
            ))}
            <select
              className="select bg-primary"
              onChange={(e) => setPageSize(e.target.value)}
            >
              <option defaultValue="10">10</option>
              <option value="5">5</option>
              <option value="11">11</option>
              <option value="15">15</option>
            </select>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
