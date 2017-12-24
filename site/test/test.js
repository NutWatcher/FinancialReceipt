let test = (a) => (b) => {
    console.log(a + " -- " + b);
}
console.log(test.toString());
console.log(test("33").toString());
test("1")("2");