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
import { AddLabelForm } from "./LabelGroupe";
import ImageInput from "../Inputs/ImageInput";
import { readFirstFile } from "@/app/utils/fileReader";

export type GroupeForm = {
  title: string,
  description: string,
  image: FileList,
  currency: string
};

export default function CreateGroupModal(props: {show() :void, title: string, button: string}) {
  const modalLabelRef = useRef<ModalHandle>(null);
  const FormGroupeActions = useForm<GroupeForm>();
  

  const onSubmitLabel = async (data: GroupeForm) => {
    let groupImage = null
    try {
      groupImage = await readFirstFile(data.image)
    } catch (err: any) {}

    request<any>("/api/groups/add", "POST", { name: data.title, currency: "CHF", description: data.description, image: groupImage })
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
      <form onSubmit={FormGroupeActions.handleSubmit(onSubmitLabel)}>
        <div className="mb-2 text-secondary">
          <TextInput title="Nom du groupe" placeholder="Titre" {...FormGroupeActions.register("title")} />
        </div>
        <div className="mb-2 text-secondary">
          <TextInput title="Description du groupe" placeholder="Description" {...FormGroupeActions.register("description")} />
        </div>
        <div className="mb-2 text-secondary">
          <ImageInput title="Image" {...FormGroupeActions.register("image")} />
        </div>
        <InputButton text='Sauvegarder'></InputButton>
      </form>
    </Modal>
  )
};