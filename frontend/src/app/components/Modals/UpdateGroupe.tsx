import Modal, { ModalHandle } from "../Modal";
import TextInput from "../Inputs/TextInput";
import InputButton from "../Inputs/InputButton";
import { useRef } from "react";
import { request } from "@/app/utils/database";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import ImageInput from "../Inputs/ImageInput";
import { readFirstFile } from "@/app/utils/fileReader";
import { useEffect, useState } from "react";
import GroupeType from "@/app/types/groupeType";

export type GroupeForm = {
  title: string,
  description: string,
  image: FileList,
  currency: string
};

export default function UpdateGroupModal(props: {show(): void, group: GroupeType}) {
  const modalLabelRef = useRef<ModalHandle>(null);
  const FormGroupeActions = useForm<GroupeForm>();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => { 
    const fetchData = async () => {
      FormGroupeActions.setValue("title", props.group.name)
      FormGroupeActions.setValue("description", props.group.description)
      setIsLoaded(true);
    }

    fetchData()
      .catch(e => toast.error(e));
  }, [props]);


  const onSubmitLabel = async (data: GroupeForm) => {
    let groupImage = null
    try {
      groupImage = await readFirstFile(data.image)
    } catch (err: any) {}

    if (groupImage === null && props.group.image !== "null") {
      groupImage = props.group.image
    }

    request<any>("/api/groups/update", "POST", { name: data.title, description: data.description, image: groupImage, groupId: props.group.id })
      .then(val => {
        toast.info(val)
        modalLabelRef.current?.closeModal();
        props.show()
        window.location.reload()
      })
      .catch(e => toast.error(e));
  };

  return (
    <Modal title='Éditer groupe' text_bt='Éditer' ref={modalLabelRef}>
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