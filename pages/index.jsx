import { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "../utils/AuthUtils";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { signinStart, parseHash } = useAuth0();
  const [email, setEmail] = useState("");
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      signinStart(email).then(console.log).catch(console.error);
      router.push("/verify");
    },
    [email]
  );

  useEffect(() => {
    parseHash().then(console.log).catch(console.error);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={handleEmailChange} />
      <button>login</button>
    </form>
  );
}
