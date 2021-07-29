const compose = (...functions) => (item) => {
  return functions.reduceRight((wrapped, f) => f(wrapped), item);
}

export default compose;
