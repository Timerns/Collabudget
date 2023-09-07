import { formatCurrency } from "../../src/app/utils/numberFormatter";

describe("Number formatter", () => {
  test("formatCurrency", () => {
    expect(formatCurrency(undefined, undefined, true)).toBe("∞ CHF");
    expect(formatCurrency(10, undefined, undefined)).toBe("+10 CHF");
    expect(formatCurrency(-10, undefined, undefined)).toBe("-10 CHF");
    expect(formatCurrency(10, "EUR", undefined)).toBe("+10 EUR");
    expect(formatCurrency(-10, "EUR", undefined)).toBe("-10 EUR");
    expect(formatCurrency(10, undefined, true)).toBe("+10 CHF");
    expect(formatCurrency(10, undefined, false)).toBe("10 CHF");
    expect(formatCurrency(-10, undefined, true)).toBe("-10 CHF");
    expect(formatCurrency(10.514, undefined, false)).toBe("10.51 CHF");
    expect(formatCurrency(10.516, undefined, false)).toBe("10.52 CHF");
  })
});