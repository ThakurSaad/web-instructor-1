import React, { useState } from "react";
import { toast } from "react-toastify";
import AddBillModal from "./AddBillModal";

const BillingRow = ({ billingSingle, refetch }) => {
  const [addBillModal, setAddBillModal] = useState(null);
  const [submitMethod, setSubmitMethod] = useState(null);

  const { _id, fullName, email, phone, paidAmount } = billingSingle || "";

  const handleDelete = () => {
    fetch(`http://localhost:5000/delete-billing?id=${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("Successfully Deleted");
          refetch();
        } else {
          toast.error("An error occurred. Please try again after reloading");
        }
      });
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{paidAmount}</td>
      <td>
        <button
          className="btn btn-xs bg-red-600 border-0"
          onClick={handleDelete}
        >
          Delete
        </button>
        <div>
          <label
            htmlFor="add-bill-modal"
            className="btn btn-xs modal-button"
            onClick={() => {
              setAddBillModal(1);
              setSubmitMethod("PUT");
            }}
          >
            Edit
          </label>
          {addBillModal && (
            <AddBillModal _id={_id} submitMethod={submitMethod} />
          )}
        </div>
      </td>
    </tr>
  );
};

export default BillingRow;
