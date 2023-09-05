import GroupeType from "@/app/types/groupeType";

export default class LabelType {
  id!: number;
  name!: string;
  color!: string;
  GroupLabels?: {id: number, GroupId: number, LabelId: number}
}