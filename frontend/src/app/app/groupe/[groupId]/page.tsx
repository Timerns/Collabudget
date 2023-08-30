import MainTitle from "@/app/components/mainTitle";
import Title from "@/app/components/title";
import GroupeType from "@/app/types/groupeType";
import {group} from "d3-array";
import TransactionList from "@/app/components/transaction/transactionList";
import TransactionType from "@/app/types/transactionType";
import LabelType from "@/app/types/labelType";
import UserGroupList from "@/app/components/userGroup/userGroupList";
import UserGroupType from "@/app/types/userGroupType";
import UserType from "@/app/types/userType";

export default function Page({params}: { params: { groupId: number } }) {
  //TODO Get data from API
  const groupId = params.groupId;

  let groupe = new GroupeType(groupId, "Vacances 2023", "CHF", 1, []);
  let transactions: TransactionType[] = [];

  let curDate = new Date();

  let soldes = [
    new UserGroupType(new UserType("aoiram", "CHF", [groupe], [], []), groupe, 20)
  ];

  // @ts-ignore
  for (const x of Array(100).keys()) {
    curDate.setFullYear(2023, 8, Math.floor(Math.random() * 30) + 1)
    transactions.push(new TransactionType(
        "Dépense",
        (Math.random() > 0.5 ? -1 : +1) * Math.floor(Math.random() * (70 - 20 + 1) + 20),
        curDate,
        Math.random() < 0.25 || Math.random().valueOf() > 0.75 ? new LabelType("Oui", "#FF00FF") : new LabelType("Non", "#FF0")));
  }

  return (
      <>
        <MainTitle title={groupe.name} subtitle={"TODO desc ?"}/>
        <div className={"grid grid-cols-1 lg:grid-cols-3 gap-7"}>
          <div>
            <Title title={"Transactions"} />
            <TransactionList transactions={transactions} />
          </div>
          <div>
            <Title title={"Soldes"} />
            <UserGroupList soldes={soldes} />
          </div>
          <div>
            <Title title={"Catégories"} />
          </div>
        </div>
      </>
  )
}