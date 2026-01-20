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
  CreateOrder(payload) {
    return http.post(`/create-order`, payload);
  }
  ToCheckPaymentStatus(payload) {
    return http.post(`verify-payment`, payload);
  }

  // http://localhost:5000/api/payment/create-order
}
export default new BaseApi();
