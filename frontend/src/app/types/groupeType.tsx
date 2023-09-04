import SoldeType from "./soldeType";

export default class GroupeType {
    id!: number;
    name!: string;
    currency!: string;
    inviteId!: string;
    description!: string;
    image!: string;
    soldes!: SoldeType[]
}