// step 1 : for loop
const sum_to_n_a = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
// step 2 : Gauss
const sum_to_n_b = (n) => {
  return (n * (n + 1)) / 2;
};
// step 3 : Recursion
const sum_to_n_c = (n) => {
  return n === 1 ? 1 : n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
