import { toISOLocal } from "../../src/app/utils/dateFormatter";

describe("Date formatter", () => {
  test("toIsoLocal", () => {
    expect(toISOLocal(new Date(2000, 8, 30)).slice(0, 23)).toBe("2000-09-30T00:00:00.000");
    expect(toISOLocal(new Date(2000, 8, 30, 12, 45, 30)).slice(0, 23)).toBe("2000-09-30T12:45:30.000");
  });
});