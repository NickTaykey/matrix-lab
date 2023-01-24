function matrixProduct(m1, m2) {
  const res = [];
  let a = 0;
  for (let i = 0; i < m1.length; ++i) {
    res.push([]);
    for (let j = 0; j < m1.length; ++j) {
      let sum = 0;
      for (let k = 0; k < m2.length; ++k) {
        sum += m1[a][k] * m2[k][j];
      }
      res[i].push(sum);
    }
    a++;
  }
  return res;
}

export { matrixProduct };
