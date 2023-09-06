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
import TransactionCategorieList from "@/app/components/transactionCategorie/transactionCategorieList";

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

  const copyToClipboard = async () => {
    try {
      const uuid = await request<string>("/api/groups/invite", "POST", { groupId: params.groupId });
      const link = process.env.FRONTEND_URL + "/app/groupe/invite/" + uuid

      await navigator.clipboard.writeText(link);
      toast.success('Le lien d\'invitation a été copié dans le presse-papier');
    } catch (err: any) {
      toast.success(err.message);
    }
  }

  return (
      <>
        <div className={"grid grid-cols-1 xl:grid-cols-3 gap-x-7"}>
          <div className={"col-span-2"}>
            <MainTitle title={data.group.name ? data.group.name : "pas de titre"} subtitle={data.group.description}/>
          </div>
          <div className={"col-span-1"}>
            <div className={"grid grid-cols-1 xl:grid-cols-3 gap-x-7"}>
              <div className={"col-span-1 text-primary hover:cursor-pointer hover:text-white"}>
                {/*<svg className="inline mr-3 w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"/>
                </svg>
                Quitter*/}
              </div>
              <div className={"col-span-1 text-primary hover:cursor-pointer hover:text-white"}>
                <svg className="inline mr-3 w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"/>
                </svg>
                Éditer
              </div>
              <div className={"col-span-1 text-primary hover:cursor-pointer hover:text-white"} onClick={copyToClipboard}>
                <svg className="inline mr-3 w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"/>
                </svg>
                Partager
              </div>
            </div>
          </div>
        </div>
        
        <div className={"grid grid-cols-1 xl:grid-cols-3 gap-x-7"}>
          <div className={"col-span-1 row-span-2"}>
            <Title title={"Transactions"}/>
            <TransactionList
              forGroup={true}
              transactions={data.transactions} 
              doubleRow={true} 
              getInfo={(t) => (t.RefundedUsername === null ? t.UserUsername ?? "" : `De ${t.UserUsername} à ${t.RefundedUsername}`)}
              getLabel={(t) => data.labels[0].find(x => x.id === Number(t.LabelId))}
              />
          </div>
          <div className={"col-span-1"}>
            <Title title={"Soldes"}/>
            <UserGroupList soldes={data.soldes}/>
          </div>
          <div className={"col-span-1"}>
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
          
          <div className={"col-span-1"}>
                <Title title={"Label du groupe"}/>
                <TransactionCategorieList
                  transactionsCategories={data.labels[0].map((x) => ({
                    isGroup: false,
                    value: 0,
                    labelColor: x.color,
                    groupeId: params.groupId,
                    labelId: x.id,
                    name: x.name
                  }))}
                   />
            </div>
          

          
        </div>
        <AddButton groups={true}></AddButton>
      </>
  )
}