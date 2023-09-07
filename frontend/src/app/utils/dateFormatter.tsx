function toISOLocal(d: Date) {
  var z  = (n: any) =>  ('0' + n).slice(-2);
  var zz = (n: any) => ('00' + n).slice(-3);
  var off = 0;
  var sign = off > 0? '-' : '+';
  off = Math.abs(off);

  return d.getFullYear() + '-'
         + z(d.getMonth()+1) + '-' +
         z(d.getDate()) + 'T' +
         z(d.getHours()) + ':'  + 
         z(d.getMinutes()) + ':' +
         z(d.getSeconds()) + '.' +
         zz(d.getMilliseconds()) +
         sign + z(off/60|0) + ':' + z(off%60); 
}

export { toISOLocal }