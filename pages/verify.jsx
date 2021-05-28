import { useCallback, useState } from "react";
import { useAuth0 } from "../utils/AuthUtils";

export default function verify() {
  const { signinVerify } = useAuth0();
  const [code, setCode] = useState("");
  const handleCodeChange = useCallback((e) => {
    setCode(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      signinVerify("kono@tricot-inc.com", code)
        .then(console.log)
        .catch(console.error);
    },
    [code]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input value={code} onChange={handleCodeChange} />
      <button>verify</button>
    </form>
  );
}
