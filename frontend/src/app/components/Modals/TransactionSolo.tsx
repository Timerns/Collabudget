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
import { AddTransactionForm } from "./TransactionGroupe";
import { toISOLocal } from "@/app/utils/dateFormatter";



export default function TransactionSoloModal(props: {show() :void}) {
  const [transactionValue, setTransactionValue] = useState<number>(0);
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [currentUser, setCurrentUser] = useState<string>();
  const [transactionCurrency, setTransactionCurrency] = useState<string>("");
  const pathname: string = usePathname()
  const modalTransactionRef = useRef<ModalHandle>(null);
  const FormTransactionActions = useForm<AddTransactionForm>();
  
  useEffect(() => {
    FormTransactionActions.setValue("date", toISOLocal(new Date()).slice(0, 16))

    request<LabelType[]>("/api/labels", "GET")
      .then(val => {
        val.map((i: LabelType) => delete i.GroupLabels)
        val.unshift({name: "Pas de label", color: "#ffffff", id: -1})
        FormTransactionActions.setValue("label", val[0])
        setLabels(val)
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

  
  const onSubmitTransaction = (data: AddTransactionForm) => {

    var requestData: any = { title: data.title, value: data.total.value, date: data.date}
    if(data.label?.id !== undefined && data.label.id !== -1) {
      requestData.labelId = data.label.id
    } 
    request<any>("/api/transactions/add", "POST", requestData)
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
      <Modal title='Ajouter une transaction' text_bt='Ajouter une transaction' ref={modalTransactionRef}>
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

        <InputButton text='Sauvegarder' ></InputButton>
      </form>
    </Modal>
    )
};