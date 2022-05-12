export async function fetchData(url, str) {
  const dataAsJson = await fetch(url + str);
  const data = await dataAsJson.json();
  console.log(data);
  return data;
}
