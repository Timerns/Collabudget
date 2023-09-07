import { getBodyUrlEncoded } from "../../src/app/utils/database";

function convertCharToHex(char: string) {
  return "%" + char.charCodeAt(0).toString(16).toUpperCase();
}

function convertString(text: string) {
  ["[", "]", ",", "\"", "{", "}", ":"].forEach(str => {
    text = text.replaceAll(str, convertCharToHex(str));
  });
  return text;
}

describe("Body encoder", () => {
  test("getBodyUrlEncoded", () => {
    expect(getBodyUrlEncoded({name: "test"})).toBe("name=test");
    expect(getBodyUrlEncoded({name: "test", pass: "123"})).toBe("name=test&pass=123");
    expect(getBodyUrlEncoded({name: "test", pass: 123, testArr: [123, 223]})).toBe(convertString("name=test&pass=123&testArr=[123,223]"));
    expect(getBodyUrlEncoded({testArr: {name: "test"}})).toBe(convertString("testArr={\"name\":\"test\"}"));
  });
});