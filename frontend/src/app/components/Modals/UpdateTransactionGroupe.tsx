import Modal, { ModalHandle } from "../Modal";
import TextInput from "../Inputs/TextInput";
import MoneyInput from "../Inputs/MoneyInput";
import DropdownInput from "../Inputs/DropdownInput";
import DateInput from "../Inputs/DateInput";
import ContributionInput from "../Inputs/ContributionInput";
import InputButton from "../Inputs/InputButton";
import { useEffect, useRef, useState } from "react";
import LabelType from "@/app/types/labelType";
import { request } from "@/app/utils/database";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import SoldeType from "@/app/types/soldeType";
import { getStatus } from "@/app/utils/account";
import GroupeType from "@/app/types/groupeType";
import TransactionType from "@/app/types/transactionType";
import ContributionType from "@/app/types/contributionType";

export type UpdateTransactionForm = {
  title: string,
  total: {
    value: number
    currency: string
  }
  date: string,
  payer: string,
  label: LabelType,
  contributors: { isContributing: boolean, username: string, value: number }[]
};

export default function UpdateTransactionGroupeModal(props: {show() :void, group: GroupeType, transaction: TransactionType}) {
  const [transactionValue, setTransactionValue] = useState<number>(0);
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [transactionCurrency, setTransactionCurrency] = useState<string>("");
  const [members, setMembers] = useState<SoldeType[]>([]);
  const pathname: string = usePathname()
  const modalTransactionRef = useRef<ModalHandle>(null);
  const FormTransactionActions = useForm<UpdateTransactionForm>();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      FormTransactionActions.setValue("title", props.transaction.title)
      FormTransactionActions.setValue("total.value", props.transaction.value)

      //Set previous label
      let labelss = await request<LabelType[]>("/api/labels/g", "POST", { groupId: props.group.id })
      labelss.unshift({name: "Pas de label", color: "#ffffff", id: -1})
      
      if (props.transaction.LabelId !== null) {
        let temp = labelss.filter(x => x.id === Number(props.transaction.LabelId))[0]
        labelss = labelss.filter(x => x.id !== Number(props.transaction.LabelId))
        labelss.unshift(temp)
      } 

      //FormTransactionActions.setValue("label", labelss[0])
      setLabels(labelss)

      //Set previous date
      FormTransactionActions.setValue("date", (new Date(props.transaction.date).toISOString()).slice(0, 16))

      setIsLoaded(true);
    }

    fetchData()
      .catch(e => toast.error(e));

    request<SoldeType[]>("/api/groups/solde", "POST", { groupId: props.group.id })
      .then(val => {
        setMembers(val)        
      })
      .catch(e => toast.error(e));

    getStatus()
      .then(val => {
        if (val === null) val = "";
        FormTransactionActions.setValue("payer", val)
        setCurrentUser(val);
      })
      .catch(e => toast.error(e));
  }, [])

  function sortList() {
    var idx = members.filter(x => x.UserUsername != currentUser)
    return  [currentUser, ...idx.map(x => x.UserUsername)]
  }
  
  const onSubmitTransaction = (data: UpdateTransactionForm) => {
    var requestData: any = { groupId: Number(props.group.id), title: data.title, value: data.total.value, date: data.date, payer: data.payer, contributors: data.contributors}
    if(data.label.id !== -1) {
      requestData.labelId = data.label.id
    } 
    request<any>("/api/transactions/g/add", "POST", requestData)
      .then(val => {
        toast.info(val)
        modalTransactionRef.current?.closeModal();
        props.show()
        window.location.reload()
      })
      .catch(e => toast.error(e));
  };

  const show = (elem: LabelType) => (
    <div className="px-2 py-1" style={{
      backgroundColor: elem.color,
      borderRadius: "25px"
    }}>
      {elem.name}
    </div>
  )
    return (
      <Modal title='Modifier la transaction' text_bt='' ref={modalTransactionRef}>
        <form onBlur={e => {
          setTransactionValue(FormTransactionActions.getValues("total.value"))
          setTransactionCurrency(FormTransactionActions.getValues("total.currency"))
        }} onSubmit={FormTransactionActions.handleSubmit(onSubmitTransaction)}>
        <div className="mb-2 text-secondary">
          <TextInput title="Titre" placeholder="Titre" {...FormTransactionActions.register("title")} />
        </div>
        <div className="mb-2 text-secondary">
          <MoneyInput title="Montant" placeholder="-" baseFormName="total" valueName="value" currencyName="currency" setValueForm={FormTransactionActions.setValue} register={FormTransactionActions.register} currencies={["CHF"]} />
        </div>
        <div className="mb-2 text-secondary">
          <DropdownInput title="Label" setValueForm={FormTransactionActions.setValue} choices={labels} show={show} {...FormTransactionActions.register("label", { value: labels[0]})} />
        </div>
        <div className="mb-2 text-secondary">
          <DateInput title="Date" {...FormTransactionActions.register("date", { })} />
        </div>
        <div className="mb-2 text-secondary">
          <ContributionInput title="Participants" register={FormTransactionActions.register} control={FormTransactionActions.control} transactionName="contributors" usernameName="username" valueName="value" isContributingName="isContributing" currency={transactionCurrency} totalValue={transactionValue} users={members.map(x => x.UserUsername)} />
        </div>
        <div className="mb-2 text-secondary">
          <DropdownInput title="Payé par" setValueForm={FormTransactionActions.setValue} choices={sortList()} show={(c) => (<span>{c}</span>)} {...FormTransactionActions.register("payer")}/>
        </div>

        <InputButton text='Sauvegarder'></InputButton>
      </form>
    </Modal>
    )
};