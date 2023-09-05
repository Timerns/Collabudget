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