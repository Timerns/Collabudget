import GroupeType from "@/app/types/groupeType";

export default class LabelType {
    title: string;
    color: string;
    groupe?: GroupeType;
    constructor(titre:string, couleur:string, groupe?: GroupeType) {
        this.title = titre;
        this.color = couleur;
        this.groupe = groupe;
    }
}