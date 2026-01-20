/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { AppContext } from "./AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Backend_Url } from "../../public/contstant";
import BaseApi from "../Service/RequestApi";
import Cookies from "js-cookie";
export const ContextProvider = ({ children }) => {
  const token = Cookies.get("token");
  const [Opennav, setOpenNav] = useState(false);
  const [Doctorcategory, setDoctorcategory] = useState("All");
  const [Profile, setProfile] = useState([]);
  const [Doctordata, setDoctordata] = useState([]);
  const [AppointedDoctor, setAppointedDoctor] = useState([]);
  const [data, setdata] = useState({
    emailOrMobile: "",
    Password: "",
  });

  const ProfileData = async () => {
    try {
      const res = await BaseApi.GetCustomerprofiledata();
      console.log("This is My User profile data ", res);
      if (res.status == 201) {
        const profileData = res?.data?.FindUser;
        localStorage.setItem("UserProfile", JSON.stringify(profileData));
      }
    } catch (error) {
      console.log(error);
    }
   
  };
  useEffect(() => {
    if (token) {
      ProfileData();
      const UserProfileData = JSON.parse(localStorage.getItem("UserProfile"));
      setProfile(UserProfileData);
    }
  }, [token]);

  useEffect(() => {
    setDoctorcategory("");
  }, []);

  const addDoctorAppointment = async (
    doctorId,
    SelectedDate,
    AppointmnetTime,
  ) => {
    const payload = {
      date: SelectedDate,
      appointedTime: AppointmnetTime,
    };
    try {
      const res = await BaseApi.BookAppointment(doctorId, payload);
      console.log("This is Booking Responce ", res);
      if (res?.status == 200) {
        setAppointedDoctor(res.data?.Appointdoctor);
        toast.success("Doctor Appointed SucesFully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    Opennav,
    setOpenNav,
    data,
    setdata,
    Profile,
    setProfile,
    Doctorcategory,
    setDoctorcategory,
    addDoctorAppointment,
    ProfileData,
    Doctordata,
    setDoctordata,
    token,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
