import Modal, { ModalHandle } from "../Modal";
import TextInput from "../Inputs/TextInput";
import MoneyInput from "../Inputs/MoneyInput";
import DropdownInput from "../Inputs/DropdownInput";
import DateInput from "../Inputs/DateInput";
import InputButton from "../Inputs/InputButton";
import { useEffect, useRef, useState } from "react";
import LabelType from "@/app/types/labelType";
import { request } from "@/app/utils/database";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getStatus } from "@/app/utils/account";
import { UpdateTransactionForm } from "./UpdateTransactionGroupe";
import GroupeType from "@/app/types/groupeType";
import TransactionType from "@/app/types/transactionType";
import { toISOLocal } from "@/app/utils/dateFormatter";

export default function UpdateTransactionSoloModal(props: {show() :void, transaction: TransactionType}) {
  const [transactionValue, setTransactionValue] = useState<number>(0);
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [currentUser, setCurrentUser] = useState<string>();
  const [transactionCurrency, setTransactionCurrency] = useState<string>("");
  const pathname: string = usePathname()
  const modalTransactionRef = useRef<ModalHandle>(null);
  const FormTransactionActions = useForm<UpdateTransactionForm>();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      FormTransactionActions.setValue("title", props.transaction.title)
      FormTransactionActions.setValue("total.value", -props.transaction.value)

      //Set previous label
      let labelss = await request<LabelType[]>("/api/labels", "GET")
      labelss.unshift({name: "Pas de label", color: "#ffffff", id: -1})
      
      if (props.transaction.LabelId !== null) {
        let temp = labelss.filter(x => x.id === Number(props.transaction.LabelId))[0]
        labelss = labelss.filter(x => x.id !== Number(props.transaction.LabelId))
        labelss.unshift(temp)
      } 

      //FormTransactionActions.setValue("label", labelss[0])
      setLabels(labelss)

      //Set previous date
      FormTransactionActions.setValue("date", toISOLocal(props.transaction.date).slice(0, 16))
      
      setIsLoaded(true);
    }

    fetchData()
      .catch(e => toast.error(e));

    getStatus()
      .then(val => {
        if (val === null) val = "";
        setCurrentUser(val);
      })
      .catch(e => toast.error(e));
  }, [])

  const onSubmitTransaction = (data: UpdateTransactionForm) => {
    var requestData: any = { title: data.title, value: data.total.value, date: new Date(data.date).valueOf(), transactionId: props.transaction.id }
    console.log(data.label?.id)
    if (data.label?.id === undefined) {
      if (props.transaction.LabelId !== null) {
        requestData.labelId = props.transaction.LabelId
      }
    } else if (data.label.id !== -1) {
      requestData.labelId = data.label.id
    }

    request<any>("/api/transactions/update", "POST", requestData)
      .then(val => {
        toast.info(val)
        modalTransactionRef.current?.closeModal();
        props.show()
        window.location.reload()
      })
      .catch(e => toast.error(e));
  };

  const onDeletTransaction = () => {
    request<any>("/api/transactions/delete", "POST", { transactionId: props.transaction.id })
      .then(val => {
        toast.info(val)
        modalTransactionRef.current?.closeModal();
        props.show()
        window.location.reload()
      })
      .catch(e => toast.error(e));
  }

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

        <InputButton text='Sauvegarder' ></InputButton>
        {
          <button type="button" className="bg-red mt-2 w-full hover:bg-white hover:text-red text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onDeletTransaction}> Supprimer </button>
        }
      </form>
    </Modal>
    )
};