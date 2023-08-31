import UserType from "@/app/types/userType";

export default class RefoundType {
  userFrom: UserType;
  userTo: UserType;
  amount: number;

  constructor(userFrom: UserType, userTo: UserType, amount: number) {
    this.userFrom = userFrom;
    this.userTo = userTo;
    this.amount = amount;
  }
}