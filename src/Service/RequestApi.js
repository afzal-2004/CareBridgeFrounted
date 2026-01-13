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
}
export default new BaseApi();
