import {formatCurrency} from "@/app/utils/numberFormatter";
import RefoundType from "@/app/types/refoundType";
import Link from "next/link";
import { request } from "@/app/utils/database";
import { toast } from "react-toastify";

export default function Refound({refound, groupId, username}: { refound: {s: string, d: string, m: number}, groupId: number, username: string}) {

  function refund () {
    request<any>("/api/transactions/g/refund", "POST", { groupId: groupId, refunder: refound.s, refunded: refound.d})
      .then(v => window.location.reload())
      .catch(e => toast.error(e));
  }

  return (
      <div className={"grid grid-cols-2 bg-secondary p-3"}>
        <div className={"col-span-1 font-semibold"}>
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"
               className={"inline mr-3"}>
            <path
                d="M14.5002 4.83331C15.782 4.83331 17.0114 5.34254 17.9178 6.24896C18.8243 7.15539 19.3335 8.38477 19.3335 9.66665C19.3335 10.9485 18.8243 12.1779 17.9178 13.0843C17.0114 13.9908 15.782 14.5 14.5002 14.5C13.2183 14.5 11.9889 13.9908 11.0825 13.0843C10.1761 12.1779 9.66683 10.9485 9.66683 9.66665C9.66683 8.38477 10.1761 7.15539 11.0825 6.24896C11.9889 5.34254 13.2183 4.83331 14.5002 4.83331ZM14.5002 16.9166C19.841 16.9166 24.1668 19.0796 24.1668 21.75V24.1666H4.8335V21.75C4.8335 19.0796 9.15933 16.9166 14.5002 16.9166Z"
                fill="#F5F5F5"/>
          </svg>
          <span>
            {refound.s} à {refound.d}
            </span>
        </div>
        <div className={`col-span-1 text-right my-auto`}>
          {(username === refound.s || username === refound.d) && <button onClick={refund} className={"text-primary px-2"}>Rembourser</button>}
          <span className={"text-green"}>
              {formatCurrency(Number(refound.m))}
            </span>
        </div>
      </div>
  )
}