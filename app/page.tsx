"use client";
import Example from "./table";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import PointButton from "./pointButton";
import { heIL } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function Home() {
  const [point, setPoint] = useState<string>("34.7793103,32.0253497");
  const theme = createTheme({ direction: "rtl" }, heIL);
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </CacheProvider>
  );
}
