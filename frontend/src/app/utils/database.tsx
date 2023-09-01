function getBodyUrlEncoded(obj?: object) {
  if (obj === undefined) {
    return undefined;
  }

  var body = new URLSearchParams();
  for (var [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      value.forEach(val => {
        if (typeof val === "object") {
          body.append(key, JSON.stringify(val));
        } else {
          body.append(key, value as string);
        }
      });
    } else if (typeof value === "object") {
      body.append(key, JSON.stringify(value));
    } else {
      body.append(key, value as string);
    }
  }
  return body.toString();
}

function processResponse<T>(res: Response) {
  return new Promise<T>((acc, rej) => {
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

export function request<T>(url: string, method: string, body?: any) {
  return new Promise<T>((acc, rej) => {
    fetch(url, { method: method, redirect: "follow", body: getBodyUrlEncoded(body), headers: body ? { "content-type": "application/x-www-form-urlencoded" } : {} })
      .then((res) => {
        processResponse<T>(res)
          .then(val => acc(val))
          .catch(err => rej(err))
      })
      .catch(err => rej(err))
  });
}