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

export default function Page({params}: { params: { groupId: number } }) {
  //TODO Get data from API
  const groupId = params.groupId;

  let groupe = new GroupeType(groupId, "Vacances 2023", "CHF", 1, []);
  let transactions: TransactionType[] = [];

  let curDate = new Date();

  const user1 = new UserType("aoiram", "CHF", [groupe], [], []);
  const user2 = new UserType("Green", "CHF", [groupe], [], []);

  let soldes = [
    new UserGroupType(user1, groupe, 20)
  ];

  let refounds = [
    new RefoundType(user1, user2, 30)
  ]

  // @ts-ignore
  for (const x of Array(100).keys()) {
    curDate.setFullYear(2023, 8, Math.floor(Math.random() * 30) + 1)
    transactions.push(new TransactionType(
        "Dépense",
        (Math.random() > 0.5 ? -1 : +1) * Math.floor(Math.random() * (70 - 20 + 1) + 20),
        curDate,
        Math.random() < 0.25 || Math.random().valueOf() > 0.75 ? new LabelType("Oui", "#FF00FF") : new LabelType("Non", "#FF0")));
  }

  let categories: string | any[] | undefined = [];
  transactions.reduce(function (res, val) {
    if (val.montant > 0) {
      // @ts-ignore
      if (!res[val.label?.title]) {
        // @ts-ignore
        res[val.label?.title] = {name: val.label?.title, value: 0, color: val.label?.color};
        // @ts-ignore
        categories?.push(res[val.label?.title])
      }

      // @ts-ignore
      res[val.label?.title].value = val.montant;
    }

    return res;
  })

  return (
      <>
        <MainTitle title={groupe.name} subtitle={"TODO desc ?"}/>
        <div className={"grid grid-cols-1 xl:grid-cols-3 gap-x-7"}>
          <div className={"col-span-1 row-span-2"}>
            <Title title={"Transactions"}/>
            <TransactionList transactions={transactions} doubleRow={true}/>
          </div>
          <div className={"col-span-1"}>
            <Title title={"Soldes"}/>
            <UserGroupList soldes={soldes}/>
          </div>
          <div className={"col-span-1 row-span-2"}>
            <Title title={"Catégories"}/>
            <ResponsiveContainer width={"100%"} height={350}>
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
            </ResponsiveContainer>
          </div>
          <div className={"col-span-1"}>
            <Title title={"Remboursement"}/>
            <RefoundList refounds={refounds}/>
          </div>
        </div>
      </>
  )
}