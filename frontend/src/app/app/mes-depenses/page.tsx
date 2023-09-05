"use client"
import LabelsAllModal from "@/app/components/Modals/LabelsAll";
import AddButton from "@/app/components/addButton";
import LimitList from "@/app/components/limits/limitList";
import MainTitle from "@/app/components/mainTitle";
import Title from "@/app/components/title";
import TransactionList from "@/app/components/transaction/transactionList";
import TransactionCategorieList from "@/app/components/transactionCategorie/transactionCategorieList";
import GroupeType from "@/app/types/groupeType";
import LabelType from "@/app/types/labelType";
import { LimitType } from "@/app/types/limitType";
import SoldeType from "@/app/types/soldeType";
import TransactionCategorieType from "@/app/types/transactionCategorieType";
import TransactionType from "@/app/types/transactionType";
import { request } from "@/app/utils/database";
import { MouseEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  type Data = {
    groups: GroupeType[],
    transactions: TransactionType[],
    labels: [LabelType[], any],
    categories: TransactionCategorieType[],
    limits: LimitType[]
    monthly: {value: number, max: number}
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Data>({
    groups: [],
    transactions: [],
    labels: [[], {}],
    categories: [],
    limits: [],
    monthly: {value: 0, max: 0}
  });
  const [date, setDate] = useState(new Date());
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const fetchData = async () => {
      let groups = await request<GroupeType[]>("/api/groups", "GET");

      for (let i = 0; i < groups.length; ++i) {
        groups[i].soldes = await request<SoldeType[]>("/api/groups/solde", "POST", { groupId: groups[i].id });
      }

      let transactions = await request<TransactionType[]>("/api/transactions", "GET");
      transactions = transactions.map(v => {
        v.date = new Date(v.date);
        v.value = -v.value;
        return v;
      }).filter(t => t.date.getMonth() === date.getMonth() && t.date.getFullYear() === date.getFullYear());
      let labels = await request<LabelType[]>("/api/labels", "GET");

      let result: any = {};
      transactions.forEach(function (value) {
        var label: {id: string, name: string, color: string} = (value.GroupId !== null ? {id: "g" + value.GroupId, name: groups.find(g => g.id === parseInt(value.GroupId as string))?.name, color: "#FF9B05"} : (labels.find(p => p.id.toString() == (value.LabelId ?? "")) as any ?? { id: -1, name: "Aucun label", color: "#000000" }));
        if (!result[label.id]) {
          result[label.id] = {label: label, value: Number(value.value)};
        } else {
          result[label.id].value += Number(value.value);
        }
      }, {});

      let categories = transactions.reduce<TransactionCategorieType[]>((acc, curr) => {
        var group = groups.find(g => g.id === Number(curr.GroupId));
        var label = labels.find(l => l.id === Number(curr.LabelId));

        var found = acc.find(a => a.name === (a.isGroup && curr.GroupId !== null ? group?.name : label?.name) && a.isGroup === (curr.GroupId !== null));
        if (found !== undefined) {
          found.value += curr.value;
        } else {
          var obj: TransactionCategorieType = {name: curr.GroupId !== null ? group?.name : label?.name, isGroup: curr.GroupId !== null, value: curr.value};
          if (label !== undefined) {
            obj.labelId = label.id;
            obj.labelColor = label.color;
          }
          acc.push(obj);
        }

        return acc;
      }, [])

      let limites = await request<[LimitRes[], LimitRes[]]>("/api/limits/month", "POST", { month: date.getMonth() + 1, year: date.getFullYear() });

      let monthly = limites[0].length === 0 || Number(limites[0][0].limit) === -1 ? undefined : limites[0][0];

      let realLimits: LimitType[] = []

      limites[1].forEach(l => {
        let categ = categories.find(c => !c.isGroup && c.labelId === l.UserLabel?.LabelId);
        let limitValue = Number(l.limit);

        let label = labels.find(lbl => lbl.id === l.UserLabel?.LabelId);

        realLimits.push({
          currentValue: categ?.value ?? 0,
          maxValue: limitValue,
          labelColor: categ?.labelColor,
          name: label?.name
        });
      });

      let monthlyVal = {
        value: 0,
        max: 0
      }

      let totalLimit = realLimits.reduce<number>((acc, curr) => acc += curr.maxValue !== -1 ? curr.maxValue : 0, 0);
      realLimits.push({
        currentValue: categories.filter(c => c.isGroup || c.name === undefined).reduce((acc, curr) => acc += curr.value, 0) ?? 0,
        maxValue: monthly ? Number(monthly.limit) - totalLimit : -1,
        name: undefined
      });

      monthlyVal.value = -categories.reduce<number>((acc, curr) => acc += curr.value, 0);
      monthlyVal.max = monthly ? Number(monthly.limit) : -1;

      setData({
        groups: groups, 
        transactions: transactions, 
        labels: [labels, result],
        categories: categories,
        limits: realLimits,
        monthly: monthlyVal
      });
      setIsLoaded(true);
    }

    fetchData()
      .catch(e => toast.error(e));
  }, [date]);

  return (
    <>
      <MainTitle title={"Mes dépenses"}/>
      <input onChange={(e) => setDate(new Date(e.target.value))} value={date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2)} type="month" className="focus:outline-none bg-secondary border-solid border border-primary p-1 rounded text-primary" />
      <div className={"grid grid-rows-1 grid-cols-1 xl:grid-cols-3 gap-x-7"}>
        {
          !isLoaded && <p>Chargement...</p>
        }
        {
          isLoaded && 
          (
            <>
              <div className={"col-span-1"}>
                <Title title={"Dernières transactions"}/>
                <TransactionList 
                  transactions={data.transactions} 
                  doubleRow={false} 
                  getInfo={(t) => (data.groups.find(g => g.id === Number(t.GroupId))?.name ?? "") + (t.GroupId !== null && t.RefundedUsername !== null ? " - " + (t.value < 0 ? t.UserUsername : t.RefundedUsername) : "")}
                  getLabel={(t) => t.GroupId === null ? data.labels[0].find(x => x.id === Number(t.LabelId)) : undefined}
                  />
              </div>
              <div className={"col-span-1"}>
                <Title title={"Dépenses par catégories"}/>
                <TransactionCategorieList
                  transactionsCategories={data.categories}
                   />
              </div>
              <div className={"col-span-1"}>
                <h3 className={"text-xl font-light border-b border-primary pb-2 mb-6 mt-5 flex items-baseline"}>
                  <div className="mr-2">
                    Limites
                  </div>
                  <div className="grow">
                    <div className="text-sm text-primary hover:cursor-pointer"></div>
                    <div className="text-sm text-primary">
                      <LabelsAllModal show={() => setMenu(!menu)} month={date.getMonth() + 1} year={date.getFullYear()} />
                    </div>
                  </div>
                  <span className="text-sm text-primary">
                    Mensuel : {data.monthly.value} / {data.monthly.max === -1 ? "∞" : data.monthly.max} CHF
                  </span>
                </h3>
                <LimitList 
                  limits={data.limits}
                  />
              </div>
            </>
          )
          
        }
      </div>
      <AddButton groups={false}></AddButton>
    </>
  )    
}