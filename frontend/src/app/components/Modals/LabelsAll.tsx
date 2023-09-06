import Modal, { ModalHandle } from "../Modal";
import TextInput from "../Inputs/TextInput";
import MoneyInput from "../Inputs/MoneyInput";
import InputButton from "../Inputs/InputButton";
import React, { useRef, useState } from "react";
import LabelType from "@/app/types/labelType";
import { request } from "@/app/utils/database";
import { toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import ColorInput from "../Inputs/ColorInput";
import { AddLabelForm } from "./LabelGroupe";
import { useEffect } from "react";
import { LimitType, LimitTypeWithLabelId } from "@/app/types/limitType";

export default function LabelsAllModal(props: {show(): void, month: number, year: number}) {
  const modalLabelRef = useRef<ModalHandle>(null);

  type FormLimitsType = {
    limits: LimitTypeWithLabelId[]
  }

  const FormLimits = useForm<FormLimitsType>();
  const FormLimitsArray = useFieldArray<FormLimitsType>({
    control: FormLimits.control,
    name: "limits"
  })

  useEffect(() => {
    const formData = async () => {
      FormLimitsArray.remove();

      var labels = await request<LabelType[]>("/api/labels", "GET");
      
      var limits = await request<[LimitRes[], LimitRes[]]>("/api/limits/month", "POST", { month: props.month, year: props.year });

      let val = NaN;
      if (limits[0].length !== 0) {
        val = Number(limits[0][0].limit);
        val = val === -1 ? NaN : val;
      }

      FormLimitsArray.append({currentValue: 0, maxValue: val, labelColor: "#FFFFFF", name: "Mensuelle", labelId: -1 });

      labels.forEach(lbl => {
        var limit = limits[1].find(l => l.UserLabel?.LabelId === lbl.id);
        var max = NaN;
        if (limit !== undefined) {
          var max = Number(limit.limit);
          max = max === -1 ? NaN : max;
        }
        FormLimitsArray.append({currentValue: 0, maxValue: max, labelColor: lbl.color, name: lbl.name, labelId: lbl.id });
      })
    }

    formData()
      .catch(err => toast.error(err))
  }, []);

  const onSubmitLimits = async (data: FormLimitsType) => {
    console.log(data);
    let total = 0;

    for (let index = 0; index < data.limits.length; index++) {
      const lim = data.limits[index];
      
      if (isNaN(lim.maxValue)) {
        lim.maxValue = -1;
      } else {
        if (lim.maxValue < 0) {
          toast.error("Les limites doivent être positives !");
          return;
        }

        if (index !== 0) {
          total += lim.maxValue;
        }
      }
    }

    if (data.limits[0].maxValue !== -1 && data.limits[0].maxValue < total) {
      toast.error("Le total de toutes les limites doivent être plus grande que la mensuelle !");
      return;
    }

    try {
      await request<string>("/api/limits/update/m", "POST", { month: props.month, year: props.year, limit: data.limits[0].maxValue })
      for (let index = 1; index < data.limits.length; index++) {
        const limit = data.limits[index];
        await request<string>("/api/limits/update/l", "POST", { month: props.month, year: props.year, limit: limit.maxValue, labelId: limit.labelId })
      }
    } catch (err: any) {
      toast.error("Erreur lors de la mise à jour des limites : " + err.message)
    }

    // toast.info(data);
    // modalLabelRef.current?.closeModal();
    // props.show()
    window.location.reload();
  };

  return (
    <Modal title='Limites' text_bt='Modifier' ref={modalLabelRef}>
      <form onSubmit={FormLimits.handleSubmit(onSubmitLimits)}>
        <div className="grid grid-cols-2 items-center">
          {
            FormLimitsArray.fields.map((lim, index) => (
              <React.Fragment key={index}>
                <div className="mb-2 col-span-1 text-secondary flex">
                  <div className="w-5 h-5 rounded-full mr-2" style={{background: lim.labelColor}}></div>
                  <div className="text-white">{lim.name}</div>
                </div>
                <div className="mb-2 col-span-1 text-secondary">
                  <MoneyInput register={FormLimits.register} setValueForm={FormLimits.setValue} currencies={["CHF"]} baseFormName={`limits.${index}`} currencyName="" valueName="maxValue" title="" placeholder="Valeur" />
                </div>
              </React.Fragment>
            ))
          }
        </div>

        <InputButton text='Sauvegarder'></InputButton>

        {/* <div className="mb-2 text-secondary">
          <TextInput title="Titre" placeholder="Titre" {...FormLimits.register("title")} />
        </div>
        <div className="mb-2 text-secondary">
          <ColorInput title="Couleur" {...FormLimits.register("color")} />
        </div> */}
      </form>
    </Modal>
  )
};