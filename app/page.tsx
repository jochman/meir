"use client";
import Example from "./table";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { PointButton } from "./pointButton";
export default function Home() {
  const [point, setPoint] = useState<string>("34.7793103,32.0253497");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {" "}
      <main
        className="min-h-screen flex-col items-center justify-between p-24"
        style={{ direction: "rtl" }}
      >
        {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"> */}
        <PointButton point={point} setPoint={setPoint}></PointButton>
        <Example point={point}></Example>
        {/* </div>
        </div> */}
      </main>
    </LocalizationProvider>
  );
}
