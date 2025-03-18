/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { DoctorCard } from "./DoctorCard";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router";
import { Backend_Url } from "../../public/contstant";
export const DoctorDetails = () => {
  const [Doctor, setDoctor] = useState([]);
  const {
    RelatedDoctor,
    setRelatedDoctor,
    Time,
    setTime,
    Date,
    setDate,
    token,
    addDoctorAppointment,
  } = useContext(AppContext);

  const { id } = useParams();
  // console.log("This is The the id if seected Doctor ", id);

  useEffect(() => {
    axios.get(`${Backend_Url}/getDoctorlist`).then((res) => {
      const Doctordata = res.data;
      const DoctorDetail = Doctordata?.find((doc) => doc._id === id);
      setDoctor(DoctorDetail);
      console.log("I want to the details of this doctor ", DoctorDetail);
      const Specility = DoctorDetail.speciality;
      const filterd = Doctordata.filter(
        (item) =>
          item.speciality.toLowerCase().includes(Specility.toLowerCase()) &&
          item._id !== id
      );

      setRelatedDoctor(filterd);
      setDoctor(DoctorDetail);
    });
  }, [id]);

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
                  className="p-1"
                  onChange={(e) => {
                    setDate(e.target.value);
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
                      Time === i && "bg-blue-500 text-white"
                    }`}
                    key={i}
                  >
                    <span
                      onClick={() => {
                        setTime(i);
                        console.log(
                          " User Select This  time for doctor meeting ",
                          time
                        );
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
                  <Link to={"/Appointments"}>
                    <button
                      className="m-[5vh] border bg-blue-500 rounded-3xl text-white p-4 sm:text-[18px] text-[15px] gap-3 flex items-center"
                      onClick={() => addDoctorAppointment(id)}
                    >
                      Book an appointment
                      <FaArrowRight />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="m-[5vh]">
          <h1 className=" text-center font-semibold  sm:text-[25px] text-[20px] m-[3vh]">
            {" "}
            Related Doctors
          </h1>
          <div
            className="flex flex-wrap  gap-6 justify-center
           "
          >
            {RelatedDoctor.map((data, i) => (
              <div key={i} className="flex max-w-[25]">
                <Link to={`/allDoctors/${data._id}`}>
                  <DoctorCard data={data} />
                </Link>
              </div>
            ))}
          </div>
        </footer>
      </section>
    </>
  );
};
