/*
JS에서는 변수를선언하는 키워드가 3가지 있다
오래된 전통적인 JS에서는 var키워드를 사용한다
최신의 JS에서는 var 키워드는 사용하지 말 것을 권한다
const, let 키워드를 사용한다
const : 한번 변수에 값을 저장하면 값 변경x 상수현 변수라고 함
let : 일반적인 변수처럼 값을 수시로 읽고 쓰기가 가능

const : 객체, 배열 등을 선언할때
let 일반적인 숫자 문자열 변수 등을 선언할때
*/

let num1 = 10;
const num2 = 20;
const sum = num1 + num2;
num1 = 100;
console.log(`${num1} + ${num2} = ${sum} `);
console.log("반갑습니다");
