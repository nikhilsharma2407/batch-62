const fn = async () => {
  return 123;
  // const value = await new Promise((res) => setTimeout(() => res(10), 1000));
};

const val = fn();
console.log(val)
