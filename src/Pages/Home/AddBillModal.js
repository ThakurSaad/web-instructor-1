import React from "react";
import { toast } from "react-toastify";

const AddBillModal = () => {
  const handleSubmit = (event) => {
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

    fetch("http://localhost:5000/add-billing", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bill),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Submitted Successfully");
        } else {
          toast.error(
            "An error occurred. Please reload the page and try again"
          );
        }
      });

    event.preventDefault();
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
              <label className="label">
                <span className="label-text-alt">{}</span>
              </label>
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
              <label className="label">
                <span className="label-text-alt">{}</span>
              </label>
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
              <label className="label">
                <span className="label-text-alt">{}</span>
              </label>
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
              <label className="label">
                <span className="label-text-alt">{}</span>
              </label>
            </div>
            <div className="modal-action my-0">
              <input
                type="submit"
                value="Submit"
                className="btn w-full max-w-full"
              />
            </div>
          </form>
          <label
            htmlFor="add-bill-modal"
            className="btn bg-green-600 w-80 my-4"
          >
            Done
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddBillModal;
