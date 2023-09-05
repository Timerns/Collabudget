import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";
import {TooltipProps} from "recharts";
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

export type AddTransactionForm = {
  title: string,
  total: {
    value: number
    currency: string
  }
  date: Date,
  payer: string,
  label: LabelType,
  contributors: { isContributing: boolean, username: string, value: number }[]
};

export default function TransactionGroupeMondal(props: {show() :void, groupId: number}) {
  const [transactionValue, setTransactionValue] = useState<number>(0);
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [transactionCurrency, setTransactionCurrency] = useState<string>("");
  const [members, setMembers] = useState<SoldeType[]>([]);
  const pathname: string = usePathname()
  const modalTransactionRef = useRef<ModalHandle>(null);
  const FormTrasactionActions = useForm<AddTransactionForm>();
  
  useEffect(() => {
    request<LabelType[]>("/api/labels/g", "POST", { groupId: props.groupId })
      .then(val => {
        val.map((i: LabelType) => delete i.GroupLabels)
        val.unshift({name: "Pas de label", color: "#ffffff", id: -1})
        FormTrasactionActions.setValue("label", val[0])
        setLabels(val)
      })
      .catch(e => toast.error(e));

    request<SoldeType[]>("/api/groups/solde", "POST", { groupId: props.groupId })
      .then(val => {
        setMembers(val)        
      })
      .catch(e => toast.error(e));

    getStatus()
      .then(val => {
        if (val === null) val = "";
        FormTrasactionActions.setValue("payer", val)
        setCurrentUser(val);
      })
      .catch(e => toast.error(e));
  }, [])

  function sortList() {
    var idx = members.filter(x => x.UserUsername != currentUser)
    return  [currentUser, ...idx.map(x => x.UserUsername)]
  }
  
  const onSubmitTransaction = (data: AddTransactionForm) => {
    var requestData: any = { groupId: Number(props.groupId), title: data.title, value: data.total.value, date: data.date.toISOString(), payer: data.payer, contributors: data.contributors}
    if(data.label.id !== -1) {
      requestData.labelId = data.label.id
    } 
    request<any>("/api/transactions/g/add", "POST", requestData)
      .then(val => {
        toast.info(val)
        modalTransactionRef.current?.closeModal();
        props.show()
        // window.location.reload()
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
      <Modal title='Ajouter une transaction' text_bt='Ajouter une transaction' ref={modalTransactionRef}>
        <form onBlur={e => {
          setTransactionValue(FormTrasactionActions.getValues("total.value"))
          setTransactionCurrency(FormTrasactionActions.getValues("total.currency"))
        }} onSubmit={FormTrasactionActions.handleSubmit(onSubmitTransaction)}>
        <div className="mb-2 text-secondary">
          <TextInput title="Titre" placeholder="Titre" {...FormTrasactionActions.register("title")} />
        </div>
        <div className="mb-2 text-secondary">
          <MoneyInput title="Montant" placeholder="-" baseFormName="total" valueName="value" currencyName="currency" setValueForm={FormTrasactionActions.setValue} register={FormTrasactionActions.register} currencies={["CHF", "EUR", "USD"]} />
        </div>
        <div className="mb-2 text-secondary">
          <DropdownInput title="Label" setValueForm={FormTrasactionActions.setValue} choices={labels} show={show} {...FormTrasactionActions.register("label", { value: labels[0]})} />
        </div>
        <div className="mb-2 text-secondary">
          <DateInput title="Date" {...FormTrasactionActions.register("date", { valueAsDate: true })} />
        </div>
        <div className="mb-2 text-secondary">
          <ContributionInput title="Participants" register={FormTrasactionActions.register} control={FormTrasactionActions.control} transactionName="contributors" usernameName="username" valueName="value" isContributingName="isContributing" currency={transactionCurrency} totalValue={transactionValue} users={members.map(x => x.UserUsername)} />
        </div>
        <div className="mb-2 text-secondary">
          <DropdownInput title="Payé par" setValueForm={FormTrasactionActions.setValue} choices={sortList()} show={(c) => (<span>{c}</span>)} {...FormTrasactionActions.register("payer")}/>
        </div>

        <InputButton text='Sauvegarder'></InputButton>
      </form>
    </Modal>
    )
};