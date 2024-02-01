"use client";

import { useSession } from "next-auth/react";
import useMoonSDK  from "../hooks/moon"
import { AccountResponse } from '@moonup/moon-api';
import { useEffect, useState } from 'react';
import axios from 'axios'
export default function Home() {
  const {data: session, status} = useSession();

  const [acc,setAcc]=useState();
  const { moon, initialize, disconnect } = useMoonSDK();
  const { updateToken, listAccounts } = useMoonSDK();

  const createAccountS = async () => {

    moon.updateToken(session?.accessToken);
    moon.updateRefreshToken(session?.refreshToken);
		const account = await moon?.getAccountsSDK().createAccount({}, {});
		console.log((account?.data.data).address);

    setAcc((account?.data.data).address);
	};
  if(status === 'loading') {
    return <p>Please wait...</p>
  }
  const onsubmit=async()=>{
    try {
      const response = await axios.post('/api/profile', {
        email: session?.user?.name,
        accessToken: session?.accessToken,
        refreshToken: session?.refreshToken,
        eoa:acc
      });
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      goknuluknu@gufum.com
      {status === 'authenticated' ? (
        <>
          I am in as {session?.user?.name} {session?.accessToken}
          <div>
            hi {session?.user?.email}
          </div>
          <button className="m-3" onClick={createAccountS}>
            CreateEOAS
          </button>
          chiku{session?.refreshToken}chiku
          The acc you set is {acc || "Not available yet"}

          <div>
          <button className="m-3" onClick={onsubmit}>
         Confirm 
          </button>
          </div>
        </>
      ) : (
        <p>Hello World!</p>
      )}
    </div>
  );
      }