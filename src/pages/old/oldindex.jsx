import { useRouter } from "next/router";
import React from "react";
export default function Index() {
  const router = useRouter();

  // Perform the client-side navigation when the component renders
  React.useEffect(() => {
    router.push("/top");
  }, []); // Empty dependency array ensures the effect runs only once

  return <div>Redirecting...</div>;
}
