/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router";
import BaseApi from "../Service/RequestApi";
export const DoctorDetails = () => {
  const [Doctor, setDoctor] = useState([]);
  const { token, addDoctorAppointment } = useContext(AppContext);

  const { id } = useParams();
  const [SelectedDate, setSelectedDate] = useState("");
  const [AppointmnetTime, setAppointmnetTime] = useState("");

  const getDoctorById = async () => {
    try {
      const res = await BaseApi.GetDoctorDetailsById(id);
      if (res?.data?.Data?.status) {
        setDoctor(res?.data?.Data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorById();
  }, [id]);
  // const now = new Date();
  // const Today = now.toLocaleDateString();
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    setSelectedDate(today);
  }, []);
  useEffect(() => {
    if (Doctor?.appointmentTime?.length > 0) {
      setAppointmnetTime(Doctor.appointmentTime[0]);
    }
  }, [Doctor]);

  return (
    <>
      <section className="mt-[5vh]  ">
        <main className="md:flex gap-10  p-4  ">
          <div className=" ">
            <img
              src={`${Doctor?.avtar}`}
              alt="Doctorimage"
              className="w-full    object-cover  bg-blue-500 sm:min-w-[300px]   rounded-xl p-0  "
            />
          </div>
          <div>
            <div className="border   border-slate-300 p-4 rounded-lg mt-[5vh] sm:mt-0 ">
              <h1>{Doctor?.name}</h1>
              <ul className="flex  gap-2 ">
                <li className="p-1 font-bold text-red-600">{Doctor?.degree}</li>
                <li className="p-1">{Doctor?.speciality}</li>
                <li className="border border-slate-500 rounded-3xl py-1 px-2">
                  {Doctor?.experience} exp
                </li>
              </ul>

              <span className="flex  items-center gap-3 ">
                <FaCircleExclamation className="text-slate-500" />
                About
              </span>
              <p className="text-slate-400  xl:max-w-[70%] xl:text-[17px]">
                {Doctor?.about}
              </p>
              <p className="font-semibold flex gap-2">
                Doctor Fees :<span>{Doctor?.doctorFees}rs</span>
              </p>
            </div>

            <div className="mt-[5vh]">
              <h1 className="font-semibold">Booking Slots</h1>
              <div className="flex  flex-wrap gap-4 md:gap-7  mt-5  m-5">
                <input
                  type="date"
                  name=""
                  id=""
                  min={today}
                  value={SelectedDate}
                  className="p-1"
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                />
                <span className="text-[15px] text-red-500 flex items-center gap-1">
                  {" "}
                  <FaCircleExclamation />
                  Book Appoinment With In Next 7 days{" "}
                </span>
              </div>
              <div className=" flex  flex-wrap gap-4  cursor-pointer">
                {Doctor?.appointmentTime?.map((time, i) => (
                  <div
                    className={`border border-gray-400 py-2   px-3 rounded-2xl sm:min-w-[150px] min-w-[100px] text-center ${
                      AppointmnetTime == time && "bg-blue-500 text-white"
                    }`}
                    key={i}
                  >
                    <span
                      onClick={() => {
                        setAppointmnetTime(time);
                      }}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                {!token || !Date ? (
                  <button
                    disabled={!token || !Date}
                    className={`m-[5vh] border ${
                      !token || !Date
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500"
                    } rounded-3xl text-white p-4 sm:text-[18px] text-[15px] gap-3 flex items-center`}
                  >
                    Book an appointment
                    <FaArrowRight />
                  </button>
                ) : (
                  <button
                    className="m-[5vh] border bg-blue-500 rounded-3xl text-white p-4 sm:text-[18px] text-[15px] gap-3 flex items-center"
                    value={SelectedDate}
                    onClick={() =>
                      addDoctorAppointment(
                        Doctor?._id,
                        SelectedDate,
                        AppointmnetTime,
                      )
                    }
                  >
                    Book an appointment
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
