const maskString = (string, start, stop) => {
  if (start >= stop) {
    return string;
  }
  let a = string.substring(0, start);
  let b = '';
  for (let i = start; i < stop; i++) {
    b += '*';
  }
  let c = string.substring(stop);
  return a + b + c;
};

export default maskString;
