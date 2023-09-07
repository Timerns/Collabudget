import { isDate, isNumber, parametersDefined } from "../routes/routes"

const res = undefined
const id = 1
const name = "Name"
const date = new Date().valueOf()
const isNull = null
const notDefine = undefined

describe("Route", () => {
  test("Defined", () => {
    expect(parametersDefined(res, [id, name, date])).toBe(true)
    expect(parametersDefined(res, [isNull])).toBe(true)

    expect(parametersDefined(res, [id, name, date, notDefine])).toBe(false)
  })

  test("Number", () => {
    expect(isNumber(res, [id], 'L\'id')).toBe(true)
    expect(isNumber(res, [isNull], 'L\'id')).toBe(true)

    expect(isNumber(res, [notDefine], 'L\'id')).toBe(false)
    expect(isNumber(res, [name], 'L\'id')).toBe(false)
  })

  test("Date", () => {
    expect(isDate(res, date)).toBe(true)

    expect(isDate(res, name)).toBe(false)
  })
})