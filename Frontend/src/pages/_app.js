import "tailwindcss/tailwind.css";
import { useEffect } from "react";
import { UserProvider } from "@/context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
