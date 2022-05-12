import fs from "fs";

const data = {
  name: "benny",
};
const jsonData = JSON.stringify(data);

fs.writeFile("mynewfile3.json", jsonData, "utf8", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

// const result = new Promise((resolve, reject) => {
// 	fs.readFile("mynewfile3.json", "utf8", function (err, data) {
// 		if (err) return reject(err);

// 		resolve(JSON.parse(data));
// 	});
// });

// result.then((data) => console.log(data));
