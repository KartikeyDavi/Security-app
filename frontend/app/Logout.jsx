"use client";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Logout = () => {
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/logout");
    if (data.success) {
      Swal.fire({
        title: "Logged Out!",
        text: "You were logged out successfully",
        icon: "success",
        confirmButtonText: "Cool",
      }).then(()=>window.location.href='/');
    }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "We are facing some issues, sorry for the inconvenience",
        icon: "error",
        confirmButtonText: "Go back",
      })
    }
  };
  return (
    <div>
      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Logout;
