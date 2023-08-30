import LabelType from "@/app/types/labelType";
import GroupeType from "@/app/types/groupeType";

export default class TransactionType {
    title: string;
    montant: number;
    date: Date;
    label?: LabelType;
    groupe?: GroupeType;

    constructor(titre: string, montant: number, date: Date, label?: LabelType, groupe?: GroupeType) {
        this.title = titre;
        this.montant = montant;
        this.date = date;
        this.label = label;
        this.groupe = groupe;
    }
}