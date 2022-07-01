import React from "react";
import { toast } from "react-toastify";

const AddBillModal = ({ submitMethod, _id }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // variables
    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const paidAmount = event.target.paidAmount.value;
    const bill = {
      fullName: fullName,
      email: email,
      phone: phone,
      paidAmount: paidAmount,
    };
    const emailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);

    if (phone.length !== 11) {
      toast.error("Phone number must be 11 characters long");
    } else if (!emailRegEx) {
      toast.error("Please provide a valid email");
    } else {
      if (submitMethod === "POST") {
        fetch("http://localhost:5000/add-billing", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(bill),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.success("Submitted Successfully");
              window.location.reload();
            } else {
              toast.error(
                "An error occurred. Please reload the page and try again"
              );
            }
          });
      }

      if (submitMethod === "PUT") {
        fetch(`http://localhost:5000/update-billing/${_id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(bill),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.success("Edited Successfully");
              window.location.reload();
            } else {
              toast.error(
                "An error occurred. Please reload the page and try again"
              );
            }
          });
      }
    }
  };

  return (
    <div>
      <input type="checkbox" id="add-bill-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Please provide the below information to add a new bill
          </h3>

          <form onSubmit={handleSubmit} className="grid justify-center">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Full Name*</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                className="input input-bordered w-80"
                required
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-80"
                required
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Phone*</span>
              </label>
              <input
                type="number"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered w-80"
                required
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Paid Amount*</span>
              </label>
              <input
                type="number"
                name="paidAmount"
                placeholder="Type here"
                className="input input-bordered w-80"
                required
              />
            </div>
            <div className="modal-action">
              <input
                type="submit"
                value="Submit"
                className="btn  w-full max-w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBillModal;
