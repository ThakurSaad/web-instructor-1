import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const AddBillModal = ({ submitMethod, _id }) => {
  // firebase hooks
  const [user] = useAuthState(auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    // variables
    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const paidAmount = event.target.paidAmount.value;
    const bill = {
      user: user?.email,
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
        fetch("https://limitless-shore-40439.herokuapp.com/add-billing", {
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
        fetch(
          `https://limitless-shore-40439.herokuapp.com/update-billing/${_id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(bill),
          }
        )
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
        <div className="modal-box relative">
          <label
            htmlFor="add-bill-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Please provide the below information
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
