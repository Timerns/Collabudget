function getBodyUrlEncoded(obj?: object) {
  if (obj === undefined) {
    return undefined;
  }

  var body = new URLSearchParams();
  for (var [key, value] of Object.entries(obj)) {
    if (Array.isArray(value) || typeof value === "object") {
      body.append(key, JSON.stringify(value));
    } else {
      body.append(key, value as string);
    }
  }
  return body.toString();
}

function processResponse<T>(res: Response) {
  return new Promise<T>(async (acc, rej) => {
    if (!res.ok) {
      rej(res.status + ": " + res.statusText);
    }

    // var txt = await res.text();
    // console.log(txt);
    // acc(JSON.parse(txt));

    res.json()
      .then(val => {
        if ("status" in val) {
          acc(val.status);
        } else {
          rej((!val.error || Object.keys(val.error).length === 0) ? "Erreur inconnue !" : val.error);
        }
      })
      .catch(e => rej(e))
  });
}

export function request<T>(url: string, method: string, body?: object) {
  return new Promise<T>(async (acc, rej) => {
    var res = await fetch(`${process.env.BACKEND_URL}${url}`, { method: method, body: getBodyUrlEncoded(body), headers: body ? { "content-type": "application/x-www-form-urlencoded" } : { }, credentials: "include" })
    var data: any = await res.json();

    if ("status" in data) {
      acc(data.status);
    } else {
      rej((!data.error || Object.keys(data.error).length === 0) ? "Erreur inconnue !" : data.error);
    }
  });
}