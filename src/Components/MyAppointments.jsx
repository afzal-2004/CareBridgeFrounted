/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AppContext } from "../Context/AppContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Backend_Url } from "../../public/contstant";
import { toast } from "react-toastify";
import { useRef } from "react";
import BaseApi from "../Service/RequestApi";
import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Swal from "sweetalert2";

export const MyAppointments = () => {
  const { token } = useContext(AppContext);
  const [AppointedDoc, setAppointedDoc] = useState([]);

  const AccesAppointedDoctor = async () => {
    try {
      const res = await BaseApi.GetAppointedDoctors();
      console.log("This is My Responce ", res);

      if (res?.data?.success) {
        setAppointedDoc(res?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AccesAppointedDoctor();
  }, []);

  const CancelCurrentAppointment = async (Appointedid) => {
    try {
      const res = await BaseApi.CancelBookedAppointment(Appointedid);
      if (res?.status) {
        Swal.fire({
          title: "Cancel Appointment!",
          icon: "success",
          draggable: true,
        });
        AccesAppointedDoctor();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteteAppointedDoctor = async (Appointedid) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You Want to Cancel This Appointment !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          CancelCurrentAppointment(Appointedid);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ marginTop: "8vh" }}>
        <>
          {AppointedDoc.length > 0 ? (
            <>
              {AppointedDoc?.map((doctor, i) => (
                <Box key={i} display="flex" justifyContent="center" mt={3}>
                  <Card
                    sx={{
                      maxWidth: 1000,
                      width: "100%",
                      borderRadius: 3,
                      boxShadow: 3,
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={3}
                      >
                        {/* Doctor Image */}
                        <Avatar
                          src={doctor.avtar}
                          variant="rounded"
                          sx={{
                            width: 180,
                            height: 220,
                            bgcolor: "#3b82f6",
                          }}
                        />

                        {/* Doctor Info */}
                        <Box flex={1}>
                          <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="error"
                          >
                            {doctor.name}
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            {doctor.speciality}
                          </Typography>

                          <Divider sx={{ my: 1 }} />

                          <Typography fontWeight="bold">Address</Typography>
                          <Typography>{doctor.addresss}</Typography>

                          <Stack direction="row" spacing={1} mt={1}>
                            <Typography fontWeight="bold">
                              Total Appointments:
                            </Typography>
                            <Typography fontWeight="bold">
                              {doctor.appointments.length}
                            </Typography>
                          </Stack>

                          {/* Appointments */}
                          <Box mt={2}>
                            {doctor.appointments.map((data, index) => (
                              <Box key={index} mb={1}>
                                <Typography fontWeight="bold" fontSize={14}>
                                  Date & Time
                                </Typography>
                                <Typography fontSize={14}>
                                  {data?.Date} — {data.appointedTime}
                                </Typography>
                              </Box>
                            ))}
                          </Box>

                          <Box mt={2}>
                            <Typography fontWeight="bold">Fees</Typography>
                            <Typography variant="h6" fontWeight="bold">
                              ₹{doctor.doctorFees}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Action Buttons */}
                        <Stack
                          spacing={2}
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ width: 160 }}
                            onClick={() => {
                              deleteteAppointedDoctor(doctor._id);
                            }}
                          >
                            Cancel
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: 160 }}
                          >
                            Pay Now
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </>
          ) : (
            "Loading ..."
          )}
        </>
      </div>
    </>
  );
};
