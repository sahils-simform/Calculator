/* eslint-disable no-unused-vars */
const displayEl = document.querySelector(".display");
const screenEl = document.querySelector(".screen");
const opeartionEl = document.querySelectorAll(".operation")
const numberEl = document.querySelectorAll(".number")
const degEl = document.querySelector("#degree");
const radEl = document.querySelector("#radian");
const mclear = document.querySelector("#mClear");
const mRecall = document.querySelector("#mRecall");
const mAdd = document.querySelector("#mAdd");
const mSub = document.querySelector("#mSub");
const mStore = document.querySelector("#mStore");
const otherOption = document.querySelector(".otherOption");
const pi = document.querySelector("#pi");
const eRaisTo = document.querySelector("#exponential");
const clearEl = document.querySelector("#allClear");
const clearLastEl = document.querySelector("#backspace");
const squareEl = document.querySelector("#square");
const inverseEl = document.querySelector("#inverse");
const AbsEl = document.querySelector("#absolute");
const expoEl = document.querySelector("#exp");
const rootEl = document.querySelector("#root");
const factoEl = document.querySelector("#facto");
const raisTOEl = document.querySelector("#raisTo");
const logEl = document.querySelector("#log");
const lnEl = document.querySelector("#ln");
const plusMinusEl = document.querySelector("#plusMinus");
const evalEl = document.querySelector("#eval");

let result = 0;
const calNo = 0;
const lastOp = "";



opeartionEl.addEventListener("click", () => {
    screenEl.textContent = opeartionEl.textContent;
})


const mathsOp = () => {
    if(lastOp === "*"){
        result = parseFloat(result) * parseFloat(calNo);
    }else  if(lastOp === "+"){
        result = parseFloat(result) + parseFloat(calNo);
    }else  if(lastOp === "-"){
        result = parseFloat(result) - parseFloat(calNo);
    }else  if(lastOp === "/"){
        result = parseFloat(result) / parseFloat(calNo);
    }
}