//How to store data on local storage

// todo : create object
let myObj = {
  name: "benny",
  last: "hassan",
};

// work also on array
// let myObj = [1, 2, 3];

//* we cant set it directly in local storage due to local storage store strings
//* so we will convert the obj to readable str
let myObj_searilized = JSON.stringify(myObj);
// console.log(myObj_searilized);

// localStorage.setItem("myObjBad", myObj);
localStorage.setItem("myObj", myObj_searilized);
console.log(localStorage.getItem("myObj"));

// now we need to convert it back to object
let myLocalStorage = JSON.parse(localStorage.getItem("myObj"));

console.log(myLocalStorage.name);
console.log(myLocalStorage.name);
// console.log(myLocalStorage);//for array
