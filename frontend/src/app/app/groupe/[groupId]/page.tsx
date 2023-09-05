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
import LabelTooltip from "@/app/components/labelTooltip";

export default function Page({params}: { params: { groupId: number } }) {
  type Data = {
    group: GroupeType,
    transactions: TransactionType[],
    labels: [LabelType[], any],
    soldes: SoldeType[]
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Data>({
    group: {id: -1, currency: "", description: "", image: "", inviteId: "", name: "", soldes: []},
    transactions: [],
    labels: [[], {}],
    soldes: []
  });

  useEffect(() => {
    const fetchData = async () => {
      let group = (await request<GroupeType[]>("/api/groups", "GET")).filter((x) => Number(x.id) === Number(params.groupId))[0];

      let soldes = await request<SoldeType[]>("/api/groups/solde", "POST", { groupId: group.id });

      let transactions = await request<TransactionType[]>("/api/transactions/g", "POST", { groupId: params.groupId });
      transactions = transactions.map(v => {
        v.date = new Date(v.date);
        return v;
      });
      let labels = await request<LabelType[]>("/api/labels/g", "POST", { groupId: group.id });

      let result: any = {};
      transactions.forEach(function (value) {
        var label: {id: string, name: string, color: string} = (labels.find(p => p.id.toString() == (value.LabelId ?? "")) as any ?? { id: -1, name: "Aucun label", color: "#000000" });
        if (!result[label.id]) {
          result[label.id] = {label: label, value: Number(value.value)};
        } else {
          result[label.id].value += Number(value.value);
        }
      }, {});

      setData({
        group: group, 
        transactions: transactions, 
        labels: [labels, result],
        soldes: soldes
      });
      setIsLoaded(true);
    }

    fetchData()
      .catch(e => toast.error(e));
  }, []);

  return (
      <>
        <MainTitle title={data.group.name ? data.group.name : "pas de titre"} subtitle={data.group.description}/>
        <div className={"grid grid-cols-1 xl:grid-cols-3 gap-x-7"}>
          <div className={"col-span-1 row-span-2"}>
            <Title title={"Transactions"}/>
            {
              <TransactionList 
                transactions={data.transactions} 
                doubleRow={true} 
                getInfo={(t) => (t.RefundedUsername === null ? t.UserUsername ?? "" : `De ${t.UserUsername} à ${t.RefundedUsername}`)}
                getLabel={(t) => data.labels.find(x => x.id === Number(t.LabelId))}
                />
            }
          </div>
          <div className={"col-span-1"}>
            <Title title={"Soldes"}/>
            <UserGroupList soldes={data.soldes}/>
          </div>
          <div className={"col-span-1 row-span-2"}>
            <Title title={"Catégories"}/>
            {
              Object.keys(data.labels[1]).length === 0 ? <p>Aucune données</p> :
              <ResponsiveContainer width={"100%"} height={300}>
                <PieChart width={700} height={300}>
                  <Tooltip labelClassName={"text-secondary"} content={<LabelTooltip/>}/>
                  <Pie data={Object.entries(data.labels[1]).map(([a, b]) => b)} dataKey="value">
                    {Object.keys(data.labels[1]).map((r) => {
                      return (
                        <Cell key={`cell-${r}`} fill={data.labels[1][r].label.color} />
                      )
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            }
          </div>
          <div className={"col-span-1"}>
            <Title title={"Remboursement"}/>
            <RefoundList refounds={data.soldes} groupId={params.groupId}/>
          </div>
        </div>
        <AddButton></AddButton>
      </>
  )
}