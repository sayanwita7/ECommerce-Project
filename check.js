// // const input = " 0   "
// // var num=0
// // if (input.trim() == "" || input.trim() == " "){
// //     console.log("Blank space")
// //     num=NaN
// // }
// // else{
// //     num = Number(input)
// // }
// // console.log(typeof input)
// // console.log(typeof num)
// // if (isNaN(num)){
// //        console.log("Not a number") 
// // }
// // else{
// //         console.log( "a number")
// // }

// // bool= Boolean(num)
// // console.log(bool)

// // if (typeof bool == "boolean"){
// //     console.log("Yes it is boolean")
// // }

// // console.log(typeof [1,2,3])

// arr=[10,12]
// console.log(arr.concat(14))
// console.log(arr)
// console.log(arr.push(15))
// console.log(arr)

// // function flatten(ary) {
// //     var ret = [];
// //     for(var i = 0; i < ary.length; i++) {
// //         if(Array.isArray(ary[i])) {
// //             ret = ret.concat(flatten(ary[i]));
// //         } else {
// //             ret=ret.concat(ary[i]);
// //         }
// //     }
// //     return ret;
// // }

// function flatten(ary) {
//     var ret = [];
//     for(var i = 0; i < ary.length; i++) {
//         if(Array.isArray(ary[i])) {
//             ret.push(flatten(ary[i]));
//         } else {
//             ret.push(ary[i]);
//         }
//     }
//     return ret;
// }
// arri=[10,[11,12], [13,14]]
// result = flatten(arri)
// console.log(result)

// // function flattenArray(arr) {
// //     let res=[]
// //     for (let i=0; i<arr.length; i++) {
// //         let item =arr[i]
        
// //         if (Array.isArray(item)){
// //             res = [...res, flattenArray(item)]
// //         }
// //         else{
// //             res =[ ...res, item]
// //         }
// //     }
    
// //     return res
// // }
// // arri=[10,[11,12], [13,14]]
// // result = flattenArray(arri)
// // console.log(result)

arr=[10,12,14]
const squareNumbers = (arr) => arr.map((num) => num**2)
console.log(squareNumbers)

