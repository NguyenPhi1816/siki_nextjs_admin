"use client";
import WithProtectedRoute from "../hoc/WithProtectedRoute";
import { redirect } from "next/navigation";

const Home = () => {
  return redirect("/category");
};

export default WithProtectedRoute(Home);
