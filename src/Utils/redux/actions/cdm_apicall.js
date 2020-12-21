import { CDMapi } from "../../api";


export function searchForContractor(name) {
  return CDMapi.get("/contacts", {
    params: {
      name
    },
  });
}