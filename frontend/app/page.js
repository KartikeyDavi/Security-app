import { cookies } from "next/headers";
import Link from "next/link";
import axios from "axios";
import Logout from "./Logout";

export default async function Home() {
  const userId = cookies().get("uid")?.value;
  const { data } = await axios.get("http://localhost:8000/user/me", {
    headers: {
      Authorization: `Bearer ${userId || ""}`,
    },
  });
  console.log(data);
  if (!data.user) {
    return <h1>An Error occured</h1>;
  }
  if (!userId) {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <button className="btn btn-primary">
          <Link href={"/signin"}>Login</Link>
        </button>
      </div>
    );
  }
  return (
    <div className="container mt-4">
      <h2 className="mr-1">Welcome {data.user.name}</h2>
      <button className="btn btn-success">Sign In a Device</button> <br />
      <br />
      <Logout/>
      <br />
      <br />
      <div className="col">
        <div class="card">
          <h5 class="card-header">Featured</h5>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
        <div class="card mt-5">
          <h5 class="card-header">Featured</h5>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
