export const formatMoney = (
  n: number,
  c: number | string = '.',
  d: string = ',',
  t: string = ','
): string => {
  c = isNaN(typeof c === 'number' ? c : parseFloat(c)) ? 2 : c;
  d = d === undefined ? '.' : d;
  t = t === undefined ? ',' : t;
  const s = n < 0 ? '-' : '';
  const i = String(parseInt(Math.abs(Number(n) || 0).toFixed(c as number), 10));
  let j;
  j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    s +
    (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c
      ? d +
        Math.abs(n - parseFloat(i))
          .toFixed(c as number)
          .slice(2)
      : '')
  );
};
