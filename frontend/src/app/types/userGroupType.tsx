import GroupeType from "@/app/types/groupeType";
import UserType from "@/app/types/userType";

export default class UserGroupType {
  user: UserType;
  group: GroupeType;
  solde: number;

  constructor(user: UserType, group: GroupeType, solde: number) {
    this.user = user;
    this.group = group;
    this.solde = solde
  }
}