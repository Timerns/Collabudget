import Modal, { ModalHandle } from "../Modal";
import TextInput from "../Inputs/TextInput";
import MoneyInput from "../Inputs/MoneyInput";
import InputButton from "../Inputs/InputButton";
import { useEffect, useRef } from "react";
import LabelType from "@/app/types/labelType";
import { request } from "@/app/utils/database";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ColorInput from "../Inputs/ColorInput";
import { title } from "process";

export type AddLabelForm = {
  title: string,
  color: string,
};
export default function LabelGroupeModal(props: {show() :void, groupId: number, label?: LabelType, title: string, button: string}) {
  const modalLabelRef = useRef<ModalHandle>(null);
  const FormLabelActions = useForm<AddLabelForm>();
  
  useEffect(() => {
    if(props.label != undefined) {
    FormLabelActions.setValue("title", props.label.name);
    FormLabelActions.setValue("color", props.label.color);
    }
    
  }, [])
  

  const onSubmitLabel = (data: AddLabelForm) => {

    if(props.label == undefined) {
      request<any>("/api/labels/g/add", "POST", { groupId: props.groupId, name: data.title, color: data.color })
      .then(val => {
        toast.info(val)
        modalLabelRef.current?.closeModal();
        props.show()
        window.location.reload()
      })
      .catch(e => toast.error(e));
      return
    } 
   
    request<any>("/api/labels/g/update", "POST", { groupId: props.groupId, name: data.title, color: data.color, id: props.label.id })
      .then(val => {
        toast.info(val)
        modalLabelRef.current?.closeModal();
        props.show()
        window.location.reload()
      })
      .catch(e => toast.error(e));
    
  };
    return (
      <Modal title={props.title} text_bt={props.button} ref={modalLabelRef}>
      <form onSubmit={FormLabelActions.handleSubmit(onSubmitLabel)}>
        <div className="mb-2 text-secondary">
          <TextInput title="Titre" placeholder="Titre" {...FormLabelActions.register("title")} />
        </div>
        <div className="mb-2 text-secondary">
          <ColorInput title="Couleur" {...FormLabelActions.register("color")} />
        </div>
        <InputButton text={props.label == undefined? 'Sauvegarder' : 'mettre à jour'}></InputButton>
      </form>
    </Modal>

    )
};