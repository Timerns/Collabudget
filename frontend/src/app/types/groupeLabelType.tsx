import GroupeType from "@/app/types/groupeType";
import LabelType from "@/app/types/labelType";

export default class GroupeLabelType {
    group: GroupeType;
    label: LabelType;
    constructor(group: GroupeType, label: LabelType) {
        this.group = group;
        this.label = label;
    }
}