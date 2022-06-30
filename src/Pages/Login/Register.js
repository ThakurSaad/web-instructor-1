import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import useToken from "../../hooks/useToken";

const Register = () => {
  // react router hook
  const navigate = useNavigate();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // firebase hooks
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  // custom hooks
  const [token] = useToken(user);
  // variable
  let errorElement;

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  if (loading || updating) {
    return <Loading />;
  }

  if (error) {
    errorElement = (
      <p className=" px-1 pb-2">
        <small className="text-red-500">{error.message}</small>
      </p>
    );
  }

  const onSubmit = async (data) => {
    createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-5xl font-bold text-center text-primary">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-semibold pl-3">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-semibold pl-3">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-semibold pl-3">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input border-r-0 border-l-0 border-t-0 border-b-2 border-primary rounded-none w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be more than 5 characters",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {errorElement}
            <input
              className="btn btn-primary w-full max-w-xs"
              type="submit"
              value="Register"
            />
          </form>
          <p className="p-1">
            <small>
              Already have an account ?{" "}
              <Link className="text-primary font-semibold" to="/login">
                Login
              </Link>
            </small>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
