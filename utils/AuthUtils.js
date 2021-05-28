import auth0 from "auth0-js";
import { useCallback } from "react";

const auth0Client = new auth0.WebAuth({
  domain: "next-js-sample.jp.auth0.com",
  clientID: "qd0aGmwtUNMQZMKlSTlh5spRmX2R5WqC",
  redirectUri: "http://localhost:3000",
  responseType: "token id_token",
});

export function useAuth0() {
  const parseHash = useCallback(() => {
    return new Promise((resolve, reject) => {
      auth0Client.parseHash({}, (err, r) => {
        if (err != null) {
          reject(err);
          return;
        }

        resolve(r);
      });
    });
  }, []);

  const signinStart = useCallback((email) => {
    return new Promise((resolve, reject) => {
      auth0Client.passwordlessStart(
        {
          connection: "email",
          send: "code",
          email,
        },
        (err, result) => {
          if (err != null) {
            reject(err);
            return;
          }

          resolve(result);
        }
      );
    });
  }, []);

  const signinVerify = useCallback((email, verificationCode) => {
    return new Promise((resolve, reject) => {
      auth0Client.passwordlessLogin(
        {
          connection: "email",
          email,
          verificationCode,
        },
        (err, result) => {
          if (err != null) {
            reject(err);
            return;
          }

          resolve(result);
        }
      );
    });
  }, []);

  return {
    parseHash,
    signinStart,
    signinVerify,
  };
}
