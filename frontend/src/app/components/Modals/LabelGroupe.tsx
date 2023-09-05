import Modal, { ModalHandle } from "../Modal";
import TextInput from "../Inputs/TextInput";
import MoneyInput from "../Inputs/MoneyInput";
import InputButton from "../Inputs/InputButton";
import { useRef } from "react";
import LabelType from "@/app/types/labelType";
import { request } from "@/app/utils/database";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ColorInput from "../Inputs/ColorInput";

export type AddLabelForm = {
  title: string,
  color: string,
};
export default function LabelGroupeModal(props: {show() :void, groupId: number}) {
  const modalLabelRef = useRef<ModalHandle>(null);
  const FormLabelActions = useForm<AddLabelForm>();
  

  const onSubmitLabel = (data: AddLabelForm) => {

    if (props.groupId === undefined) return;
    request<any>("/api/labels/g/add", "POST", { groupId: props.groupId, name: data.title, color: data.color })
      .then(val => {
        toast.info(val)
        modalLabelRef.current?.closeModal();
        props.show()
        window.location.reload()
      })
      .catch(e => toast.error(e));
  };
    return (
      <Modal title='Nouveau label' text_bt='Nouveau label' ref={modalLabelRef}>
      <form onSubmit={FormLabelActions.handleSubmit(onSubmitLabel)}>
        <div className="mb-2 text-secondary">
          <TextInput title="Titre" placeholder="Titre" {...FormLabelActions.register("title")} />
        </div>
        <div className="mb-2 text-secondary">
          <ColorInput title="Couleur" {...FormLabelActions.register("color")} />
        </div>
        <InputButton text='Sauvegarder'></InputButton>
      </form>
    </Modal>

    )
};