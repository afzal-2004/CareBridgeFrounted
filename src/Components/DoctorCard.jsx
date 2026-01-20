/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Backend_Url } from "../../public/contstant";
import { toast } from "react-toastify";
export const DoctorCard = ({ data, cancel, Doctorid }) => {
  const DeletedDoctor = (id) => {
    axios
      .delete(`${Backend_Url}/deleteDoctor/${id}`)
      .then((e) => {
        console.log(e);
        if (e.status === 201) {
          toast.success(`${e.data.message}`, {
            autoClose: 2000,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="relative">
      {cancel && (
        <MdDelete
          className=" text-black text-[25px] absolute right-3 top-2"
          onClick={() => {
            DeletedDoctor(Doctorid);
          }}
        />
      )}

      <Link to={`/allDoctors/${data._id}`}>
        <img
          src={data.avtar}
          alt=""
          className=" bg-blue-50  hover:bg-blue-500 rounded-lg  "
        />

        <div className=" flex flex-col p-3">
          <p className="flex items-center text-green-300 ">
            <GoDotFill />
            Avalible
          </p>
          <h2>{data.name}</h2>
          <p>{data.speciality}</p>
        </div>
      </Link>
    </div>
  );
};
