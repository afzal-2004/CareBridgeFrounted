import { Index } from "./Router/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import 'sweetalert2/src/sweetalert2.scss'
function App() {
  return (
    <>
      <ToastContainer />
      <Index />
    </>
  );
}

export default App;
