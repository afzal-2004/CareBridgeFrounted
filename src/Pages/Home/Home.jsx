import Hedaderimage from "../../assets/frontend/header_img.png";
import Footerimage from "../../assets/frontend/appointment_img.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { specialityData } from "../../assets/frontend/assets";
import { Link } from "react-router-dom";
import { DoctorCard } from "../../Components/DoctorCard";
import { useState, useEffect } from "react";
import BaseApi from "../../Service/RequestApi";
import Loader from "../../Components/Loader";
export const Home = () => {
  const [Doctorsdata, setDoctorsdata] = useState([]);

  const getAlllistofDoctor = async () => {
    try {
      const res = await BaseApi.GetAllDoctorList();
      if (res.status == 201) {
        setDoctorsdata(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAlllistofDoctor();
  }, []);
  return (
    <div>
      <main>
        <section className="bg-blue-500  flex  sm:flex-row flex-col-reverse justify-between items-center">
          {" "}
          <div className="  flex flex-col justify-center items-center p-3 sm:p-0 ">
            {" "}
            <h1 className="sm:text-[45px] md:text-[50px] text-[30px] text-white sm:font-bold font-semibold text-nowrap sm:text-wrap ml-4">
              Book Appointment
              <br />
              With Trusted Doctors
            </h1>
            <div className=" flex items-center gap-3">
              <img src="/frontend/group_profiles.png" alt="" />
              <p className="text-white m-4 sm:m-7  font-normal">
                Simply browse through our extensive list of trusted
                <br />
                doctors, schedule your appointment hassle-free.
              </p>
            </div>
            <Link to="/allDoctors">
              <button className="bg-white rounded-3xl p-3 flex gap-3 justify-between  items-center mt-[5vh]">
                {" "}
                Book Appointment
                <FaArrowRightLong />
              </button>
            </Link>
          </div>
          <div>
            <img
              src={Hedaderimage}
              alt=""
              className="sm:w-[600px]    md:w-[700px]"
            />
          </div>
        </section>
        <section className=" mt-[5vh]">
          <h1 className="text-[25px] sm:text-[35px] font-semibold text-center">
            Find by Speciality
          </h1>
          <p className="text-[10px] sm:text-[15px] w-[70%] sm:w-[45%] text-center m-auto mt-[5vh]">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
          <div className="flex gap-3 sm:gap-5 flex-wrap justify-center mt-[5vh]">
            {specialityData.map((data, i) => (
              <div key={i} className=" gap-3 ">
                <img src={data.image} alt="" className="w-[70px] " />
                <p className="text-nowrap text-[12px]">{data.speciality}</p>
              </div>
            ))}
          </div>
        </section>
        <section className=" mt-[5vh]">
          <h1 className="text-[25px] sm:text-[35px] font-semibold text-center">
            Top Doctors to Book
          </h1>
          <p className="text-[10px] sm:text-[15px] w-[70%] sm:w-[45%] text-center m-auto mt-[1vh]">
            Simply browse through our extensive list of trusted doctors.
          </p>
          <main className="  gap-4 grid   grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 sm:gap-6   p-10   justify-center ">
            {Doctorsdata.length === 0 ? (
              <Loader />
            ) : (
              <>
                {Doctorsdata.map((data, i) => (
                  <div
                    key={i}
                    className={`flex flex-col  items-center rounded-lg  mt-3 border border-slate-200 ${
                      i % 2 === 0 && "hidden"
                    }`}
                  >
                    <DoctorCard data={data} />
                  </div>
                ))}
              </>
            )}
          </main>
          <div className=" flex justify-center">
            <button className="text-center bg-blue-300 py-3 px-10 font-normal rounded-3xl">
              <Link to={"/allDoctors"}>More..</Link>
            </button>
          </div>
          <footer className=" rounded-lg bg-blue-500 mt-[5vh]">
            <section className=" w-[70%] m-auto flex justify-between items-center">
              <div className="p-4">
                <h1 className="text-[35px] sm:text-[45px] font-semibold text-center  sm:p-[20px] p-[10px] ">
                  Book Appointment <br /> With 100+ Trusted Doctors
                </h1>
                <Link to="/register">
                  <button className=" bg-white p-2 rounded-3xl flex items-center gap-3">
                    Create account
                    <FaArrowRightLong />
                  </button>
                </Link>
              </div>
              <div>
                <img
                  src={Footerimage}
                  alt=""
                  className=" 
              max-w-[150px] sm:max-w-[200px] 
            xl:max-w-[400px]"
                />
              </div>
            </section>
          </footer>
        </section>
      </main>
    </div>
  );
};
