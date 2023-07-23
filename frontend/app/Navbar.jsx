import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import axios from "axios";
const Navbar = async () => {
  const userId = cookies().get("uid")?.value;
  const { data } = await axios.get("http://localhost:8000/user/me", {
    headers: {
      Authorization: `Bearer ${userId || ""}`,
    },
  });
  const { loggedIn } = data;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Security-app
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className="nav-link active"
              aria-current="page"
              href="/signup"
            >
              {loggedIn ? "You" : "Signup"}
            </Link>
            <Link className="nav-link" href="/signin">
              {loggedIn ? "Devices" : "SignIn"}
            </Link>
            <a className="nav-link" href="#">
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
