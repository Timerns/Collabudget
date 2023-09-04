import LabelType from "@/app/types/labelType";
import GroupeType from "@/app/types/groupeType";

export default class TransactionType {
    id!: number;
    title!: string;
    value!: number;
    date!: Date;
    UserUsername!: string | null;
    RefundedUsername!: string | null;
    GroupId!: string | null;
    LabelId!: string | null;
}