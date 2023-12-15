import { countries } from "@/constants/data";


// export default function (iso_code: string): { Code: string; Name: string } {
// 	const country = countries.find((iso) => iso.Code === iso_code);
// 	return country as { Code: string; Name: string };
// }

export const getCountryCode = (ctryName: string) => {
	const country = countries.find(ctry => ctry.Name === ctryName) 
	return country as { Code: string; Name: string };
}
