/* eslint-disable react/prop-types */
import { DoctorCard } from "../../Components/DoctorCard";
import { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import BaseApi from "../../Service/RequestApi";
import Loader from "../../Components/Loader";
export const Doctors = ({ cancel }) => {
  const { Doctorcategory, Doctordata, setDoctordata } = useContext(AppContext);

  const getAlllistofDoctor = async () => {
    try {
      const res = await BaseApi.GetAllDoctorList();
      const Doctors = res.data;
      if (res.status == 201) {
        if (Doctorcategory === "All") {
          setDoctordata(Doctors);
        } else {
          const filterd = Doctors.filter((item) =>
            item.speciality.toLowerCase().includes(Doctorcategory.toLowerCase())
          );
          setDoctordata(filterd);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getAlllistofDoctor();
  }, [Doctorcategory]);

  return (
    <>
      <main className="  gap-4 grid   grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 sm:gap-6   p-10   justify-center">
        {Doctordata.length === 0 ? <Loader /> : ""}
        {Doctordata.map((data, i) => (
          <div
            key={i}
            className="flex flex-col  items-center rounded-lg  mt-3 border border-slate-200"
          >
            <DoctorCard data={data} cancel={cancel} Doctorid={data._id} />
          </div>
        ))}
      </main>
    </>
  );
};
