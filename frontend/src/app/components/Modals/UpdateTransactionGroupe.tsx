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
import { toISOLocal } from "@/app/utils/dateFormatter";

export type UpdateTransactionForm = {
  title: string,
  total: {
    value: number
    currency: string
  }
  date: string,
  payer: string,
  label?: LabelType,
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
  const [contrbs, setContrbs] = useState<ContributionType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      FormTransactionActions.setValue("title", props.transaction.title)

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
      FormTransactionActions.setValue("date", toISOLocal(props.transaction.date).slice(0, 16))

      //Set group members
      let groupMembers = await request<SoldeType[]>("/api/groups/solde", "POST", { groupId: props.group.id })
      if (props.transaction.UserUsername !== null) {
        let temp = groupMembers.filter(member => member.UserUsername == props.transaction.UserUsername)[0]
        groupMembers = groupMembers.filter(member => member.UserUsername != props.transaction.UserUsername)
        groupMembers.unshift(temp)
      } else {
        let temp = groupMembers.filter(member => member.UserUsername == currentUser)[0]
        groupMembers = groupMembers.filter(member => member.UserUsername != currentUser)
        groupMembers.unshift(temp)
      }
      
      setMembers(groupMembers)

      //Set contributors
      let contributors = await request<ContributionType[]>("/api/transactions/g/contributor", "POST", { groupId: props.group.id, transactionId: props.transaction.id })
      setContrbs(contributors);

      FormTransactionActions.setValue("total.value", props.transaction.value)
      setTransactionValue(props.transaction.value)
      FormTransactionActions.setValue("total.currency", "CHF")
      setTransactionCurrency("CHF")

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
    var requestData: any = { groupId: Number(props.group.id), title: data.title, value: data.total.value, date: new Date(data.date).valueOf(), payer: data.payer, contributors: data.contributors, transactionId: props.transaction.id }
    if (data.label?.id === undefined) {
      if (props.transaction.LabelId !== null) {
        requestData.labelId = props.transaction.LabelId
      }
    } else if (data.label.id !== -1) {
      requestData.labelId = data.label.id
    }
    if (data.payer === undefined) {
      requestData.payer = props.transaction.UserUsername 
    }

    request<any>("/api/transactions/g/update", "POST", requestData)
      .then(val => {
        toast.info(val)
        modalTransactionRef.current?.closeModal();
        props.show()
        window.location.reload()
      })
      .catch(e => toast.error(e));
  };

  const onDeleteTransaction = () => {
    request<any>("/api/transactions/g/delete", "POST", { groupId: Number(props.group.id), transactionId: props.transaction.id })
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
      <div>
        {
          props.transaction.RefundedUsername === null ? 
            <Modal title='Modifier la transaction' text_bt='' ref={modalTransactionRef}>
              <form onBlur={e => {
                setTransactionValue(FormTransactionActions.getValues("total.value"))
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
                <ContributionInput title="Participants" register={FormTransactionActions.register} control={FormTransactionActions.control} transactionName="contributors" usernameName="username" valueName="value" isContributingName="isContributing" currency={transactionCurrency} totalValue={transactionValue} users={members.map(x => ({name: x.UserUsername, isContrib: (() => { let found = contrbs.find(c => c.UserUsername === x.UserUsername); return found ? (Number(found.value) === 0 ? false : true) : false })()}))} />
              </div>
              <div className="mb-2 text-secondary">
                <DropdownInput title="Payé par" setValueForm={FormTransactionActions.setValue} choices={members.map(x => x.UserUsername)} show={(c) => (<span>{c}</span>)} {...FormTransactionActions.register("payer")}/>
              </div>

              <InputButton text='Sauvegarder'></InputButton>
              {
                <button type="button" className="bg-red mt-2 w-full hover:bg-white hover:text-red text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onDeleteTransaction}> Supprimer </button>
              }
            </form>
          </Modal> :
          <Modal title='Annuler le remboursement' text_bt='' ref={modalTransactionRef}>
            {
              <button type="button" className="bg-red mt-2 w-full hover:bg-white hover:text-red text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onDeleteTransaction}> Supprimer </button>
            }
          </Modal>
        }
      </div>
      
    )
};