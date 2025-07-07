import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import "./Components.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Backend_Url } from "../../public/contstant.js";
export const Register = () => {
  const navigate = useNavigate();
  const [Registerdata, setRegisterdata] = useState({
    name: "",
    email: "",
    Mobilenumner: "",
    Password: "",
    profilePicture: "",
    Address: "",
    Gender: "",
    DOB: "",
  });
  const handelChange = (e) => {
    e.preventDefault();
    setRegisterdata({
      ...Registerdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleData = (e) => {
    console.log(e);
    e.preventDefault();

    axios
      .post(`${Backend_Url}/Register`, Registerdata)
      .then(() => {
        toast.success("Register SuccessFully", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something Went Wrong ");
      });

    console.log(Registerdata);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleData}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={Registerdata.name}
            onChange={handelChange}
            className="loginForminput"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={Registerdata.email}
            onChange={handelChange}
            className="loginForminput"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            MobileNumber
          </label>
          <input
            type="text"
            name="Mobilenumner"
            value={Registerdata.Mobilenumner}
            onChange={handelChange}
            className="loginForminput"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={Registerdata.Password}
            name="Password"
            onChange={handelChange}
            className="loginForminput"
            required
          />
        </div>

        <button type="submit" className="RegisterandLoginBtn">
          Register
        </button>
        <Link to="/login">
          <p className=" mt-3">
            Already Have An Accont ?{" "}
            <span className="text-blue-400">Login</span>
          </p>
        </Link>
      </form>
    </div>
  );
};

export const Login = () => {
  const navigate = useNavigate();
  const { data, setdata, setProfile } = useContext(AppContext);

  const handleChange = (e) => {
    e.preventDefault();
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleData = (e) => {
    e.preventDefault();
    axios
      .post(`${Backend_Url}/Login`, data)
      .then((e) => {
        handleChange;

        const Token = e.data.token;

        Cookies.set("token", Token, { expires: 1 });
        console.log(e);
        toast.success(`${e.data?.message}`);
        setProfile(e.data.finduser);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex items-center justify-center max-h-screen mt-[5vh]">
      <form
        onSubmit={handleData}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email or Mobile No.
          </label>
          <input
            type="text"
            value={data.emailOrMobile}
            name="emailOrMobile"
            onChange={handleChange}
            className="loginForminput"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="Password"
            value={data.Password}
            className="loginForminput"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="RegisterandLoginBtn">
          Login
        </button>
        <Link to="/register">
          <p className=" mt-3">
            Not Have An Accont ?{" "}
            <span className="text-blue-400">Regitster</span>
          </p>
        </Link>
      </form>
    </div>
  );
};
