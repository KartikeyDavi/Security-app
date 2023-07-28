"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(()=>{
    setName("");
    setEmail("");
    setPassword("");
  },[])
  const register = async (e) => {
    e.preventDefault();
    try {
    const { data } = await axios.post("/api/signup", { name, email, password });
      if(data.success){
        Swal.fire({
          title:"Logged in",
          text:"You were signed up successfully",
          icon:"success",
          confirmButtonText:"Continue"
        }).then(()=>window.location.href='/')
      }else{
        Swal.fire({
          title:"Failure!",
          text:data.message,
          icon:"warning",
          confirmButtonText:"Continue"
        })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title:"Error!",
        text:"We are facing some issues, please try again later",
        icon:"error",
        confirmButtonText:"Go back"
      })
    }
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={register}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember Me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default page;
