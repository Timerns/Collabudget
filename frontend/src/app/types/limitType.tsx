export class LimitType {
  name?: string;
  currentValue!: number;
  maxValue!: number;
  labelColor?: string;
}

export class LimitTypeWithLabelId extends LimitType {
  labelId!: number;
}