import http from "./ConstantFile";

class BaseApi {
  GetAllDoctorList() {
    return http.get(`/getDoctorlist`);
  }

  CustomerRegister(Payload) {
    return http.post(`/Register`, Payload);
  }
  CustomerLogin(Payload) {
    return http.post(`Login`, Payload);
  }
  GetCustomerprofiledata() {
    return http.get(`/Userprofile`);
  }
  GetDoctorDetailsById(Id) {
    return http.get(`/getDoctorDetail/${Id}`);
  }
  BookAppointment(Doctorid, payload) {
    return http.post(`/AppointedDoctor/${Doctorid}`, payload);
  }
  GetAppointedDoctors() {
    return http.get(`/AccessAppointedDoctor`);
  }
  CancelBookedAppointment(id) {
    return http.delete(`/DeletedAppointedDoctor/${id}`);
  }
}
export default new BaseApi();
