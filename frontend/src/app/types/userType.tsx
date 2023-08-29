import GroupeType from "@/app/types/groupeType";
import LabelType from "@/app/types/labelType";
import TransactionType from "@/app/types/transactionType";

export default class UserType {
    username: string;
    currency: string;
    groups: GroupeType[];
    labels: LabelType[];
    transactions: TransactionType[];

    constructor(username: string, currency:string, groups:GroupeType[], labels: LabelType[], transactions: TransactionType[]) {
        this.username = username;
        this.currency = currency;
        this.groups = groups;
        this.labels = labels;
        this.transactions = transactions;
    }
}