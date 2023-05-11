let string = `asd
asd


asd
`;
const regex = /\n{2,}/g;
// console.log(.replace(regex, ''),);

console.log(string);
console.log(regex.test(string));
console.log(string.match(regex));
console.log(string.replaceAll(regex, `\n`));
