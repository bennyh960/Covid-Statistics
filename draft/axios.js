// npm init
//npm install axios
import axios from "axios";
//

export function fetching(params) {
  const fetcData = axios.get("https://corona-api.com/countries");
  console.log(fetcData);
}
