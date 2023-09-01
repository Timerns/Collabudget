export function readFirstFile(files?: FileList) {
  return new Promise<string>((res, rej) => {
    var file = files?.item(0) ?? null;
    if (file === null) {
      rej();
      return;
    }

    var fr = new FileReader();
    fr.onloadend = (e) => {
      var r = e.target?.result ?? null;
      if (r === null) {
        rej();
        return;
      }

      res(r.toString());
    }
    fr.readAsDataURL(file);
  });
}