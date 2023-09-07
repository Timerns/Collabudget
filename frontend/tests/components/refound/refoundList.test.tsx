import { getRefundList } from "../../../src/app/utils/refund";
import SoldeType from "../../../src/app/types/soldeType";

describe("Refund list", () => {
  test("getRefundList", () => {
    var solde1: SoldeType = { GroupId: -1, id: -1, UserUsername: "Jane", solde: "0" };
    expect(getRefundList([solde1])).toStrictEqual([]);

    var solde2: SoldeType = { GroupId: -1, id: -1, UserUsername: "Green", solde: "-10" };
    var solde3: SoldeType = { GroupId: -1, id: -1, UserUsername: "Blue", solde: "10" };
    var expResp23 = [ { s: "Green", d: "Blue", m: 10 } ];
    expect(getRefundList([solde2, solde3])).toStrictEqual(expResp23);
    expect(getRefundList([solde1, solde2, solde3])).toStrictEqual(expResp23);
    
    var solde4: SoldeType = { GroupId: -1, id: -1, UserUsername: "Green", solde: "10" };
    var solde5: SoldeType = { GroupId: -1, id: -1, UserUsername: "Blue", solde: "-5" };
    var solde6: SoldeType = { GroupId: -1, id: -1, UserUsername: "Red", solde: "-5" };
    var expResp456 = [ { s: "Red", d: "Green", m: 5 }, { s: "Blue", d: "Green", m: 5 } ];
    expect(getRefundList([solde4, solde5, solde6])).toStrictEqual(expResp456);
    expect(getRefundList([solde1, solde4, solde5, solde6])).toStrictEqual(expResp456);

    var solde7: SoldeType = { GroupId: -1, id: -1, UserUsername: "Green", solde: "-10" };
    var solde8: SoldeType = { GroupId: -1, id: -1, UserUsername: "Blue", solde: "5" };
    var solde9: SoldeType = { GroupId: -1, id: -1, UserUsername: "Red", solde: "5" };
    var expResp789 = [ { s: "Green", d: "Blue", m: 5 }, { s: "Green", d: "Red", m: 5 } ];
    expect(getRefundList([solde7, solde8, solde9])).toStrictEqual(expResp789);
    expect(getRefundList([solde1, solde7, solde8, solde9])).toStrictEqual(expResp789);

    var solde10: SoldeType = { GroupId: -1, id: -1, UserUsername: "Green", solde: "-5" };
    var solde11: SoldeType = { GroupId: -1, id: -1, UserUsername: "Blue", solde: "5" };
    var solde12: SoldeType = { GroupId: -1, id: -1, UserUsername: "Red", solde: "5" };
    var solde13: SoldeType = { GroupId: -1, id: -1, UserUsername: "Yellow", solde: "-5" };
    var expResp10111213 = [ { s: "Yellow", d: "Blue", m: 5 }, { s: "Green", d: "Red", m: 5 } ];
    expect(getRefundList([solde10, solde11, solde12, solde13])).toStrictEqual(expResp10111213);
    expect(getRefundList([solde1, solde10, solde11, solde12, solde13])).toStrictEqual(expResp10111213);
  });
});