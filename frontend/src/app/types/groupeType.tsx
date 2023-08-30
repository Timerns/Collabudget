import LabelType from "@/app/types/labelType";

export default class GroupeType {
    id: number;
    name: string;
    currency: string;
    inviteId: number;
    labels: LabelType[];

    constructor(id: number, name: string, currency: string, inviteId: number, labels: LabelType[]) {
        this.id = id;
        this.name = name;
        this.currency = currency;
        this.inviteId = inviteId;
        this.labels = labels;
    }
}