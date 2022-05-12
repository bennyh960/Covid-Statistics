export async function fetchData(url, str) {
  // const proxy = "https://cors.bridged.cc/";
  const dataAsJson = await fetch(url + str);
  const data = await dataAsJson.json();
  console.log(data);
  return data;
}
