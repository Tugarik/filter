import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <div className="Home container">
        <h1 className="my-5">Products List</h1>
        <Navigation />
        <Outlet />
    </div>
  );
}