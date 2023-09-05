"use client"
import MainTitle from "@/app/components/mainTitle";
import Title from "@/app/components/title";
import GroupeType from "@/app/types/groupeType";
import TransactionList from "@/app/components/transaction/transactionList";
import TransactionType from "@/app/types/transactionType";
import LabelType from "@/app/types/labelType";
import UserGroupList from "@/app/components/userGroup/userGroupList";
import UserGroupType from "@/app/types/userGroupType";
import UserType from "@/app/types/userType";
import RefoundType from "@/app/types/refoundType";
import RefoundList from "@/app/components/refound/refoundList";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import AddButton from "@/app/components/addButton";
import { useEffect, useState } from "react";
import { request } from "@/app/utils/database";
import { toast } from "react-toastify";
import SoldeType from "@/app/types/soldeType";

export default function Page({params}: { params: { groupId: number } }) {

  const [groupe, setGroupe] = useState<GroupeType>()
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const [labels, setLabels] = useState<LabelType[]>([])
  const [soldes, setSoldes] = useState<SoldeType[]>([])
  const [isLoaded, setisLoaded] = useState(false)

  useEffect(() => {
    request<any>("/api/groups/solde", "POST", { groupId: params.groupId})
      .then(val => {
        setSoldes(val)
        setisLoaded(true);
      })
      .catch(e => toast.error(e));

    request<TransactionType[]>("/api/transactions/g", "POST", { groupId: params.groupId})
      .then(val => {
        setTransactions(val)
      })
      .catch(e => toast.error(e));

    request<LabelType[]>("/api/labels/g", "POST", { groupId: params.groupId})
      .then(val => {
        setLabels(val)
      })
      .catch(e => toast.error(e));

      request<GroupeType[]>("/api/groups", "GET")
      .then(val => {
        val = val.filter((x) => x.id === params.groupId)
        setGroupe(val[0])
      })
      .catch(e => toast.error(e));
  }, [])

  return (
      <>
        <MainTitle title={groupe?.name ? groupe?.name : "pas de titre"} subtitle={"TODO desc ?"}/>
        <div className={"grid grid-cols-1 xl:grid-cols-3 gap-x-7"}>
          <div className={"col-span-1 row-span-2"}>
            <Title title={"Transactions"}/>
            <TransactionList labels={labels} transactions={transactions} doubleRow={true}/>
          </div>
          <div className={"col-span-1"}>
            <Title title={"Soldes"}/>
            <UserGroupList soldes={soldes}/>
          </div>
          <div className={"col-span-1 row-span-2"}>
            <Title title={"Catégories"}/>
            {/* <ResponsiveContainer width={"100%"} height={350}>
              <PieChart>
                <Pie data={categories} dataKey={"value"} label>
                  {categories.map((c, index) => {
                    return (
                        <Cell key={`cell-${index}`} fill={c.color}/>
                    )
                  })}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer> */}
          </div>
          <div className={"col-span-1"}>
            <Title title={"Remboursement"}/>
            <RefoundList refounds={soldes} groupId={params.groupId}/>
          </div>
        </div>
        <AddButton groups={true}></AddButton>
      </>
  )
}