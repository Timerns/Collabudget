import Solde from "./solde";

export default class GroupeType {
    id!: number;
    name!: string;
    currency!: string;
    inviteId!: string;
    description!: string;
    image!: string;
    soldes!: Solde[]
}