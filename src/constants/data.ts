import { imgs } from "./images";

export const sortType = ["Ascending","Descending"]
export const countries: { Code: string; Name: string }[] = [
	{
		Code: "AF",
		Name: "Afghanistan",
	},
	{
		Code: "AX",
		Name: "Åland Islands",
	},
	{
		Code: "AL",
		Name: "Albania",
	},
	{
		Code: "DZ",
		Name: "Algeria",
	},
	{
		Code: "AS",
		Name: "American Samoa",
	},
	{
		Code: "AD",
		Name: "Andorra",
	},
	{
		Code: "AO",
		Name: "Angola",
	},
	{
		Code: "AI",
		Name: "Anguilla",
	},
	{
		Code: "AQ",
		Name: "Antarctica",
	},
	{
		Code: "AG",
		Name: "Antigua and Barbuda",
	},
	{
		Code: "AR",
		Name: "Argentina",
	},
	{
		Code: "AM",
		Name: "Armenia",
	},
	{
		Code: "AW",
		Name: "Aruba",
	},
	{
		Code: "AU",
		Name: "Australia",
	},
	{
		Code: "AT",
		Name: "Austria",
	},
	{
		Code: "AZ",
		Name: "Azerbaijan",
	},
	{
		Code: "BS",
		Name: "Bahamas",
	},
	{
		Code: "BH",
		Name: "Bahrain",
	},
	{
		Code: "BD",
		Name: "Bangladesh",
	},
	{
		Code: "BB",
		Name: "Barbados",
	},
	{
		Code: "BY",
		Name: "Belarus",
	},
	{
		Code: "BE",
		Name: "Belgium",
	},
	{
		Code: "BZ",
		Name: "Belize",
	},
	{
		Code: "BJ",
		Name: "Benin",
	},
	{
		Code: "BM",
		Name: "Bermuda",
	},
	{
		Code: "BT",
		Name: "Bhutan",
	},
	{
		Code: "BO",
		Name: "Bolivia, Plurinational State of",
	},
	{
		Code: "BQ",
		Name: "Bonaire, Sint Eustatius and Saba",
	},
	{
		Code: "BA",
		Name: "Bosnia and Herzegovina",
	},
	{
		Code: "BW",
		Name: "Botswana",
	},
	{
		Code: "BV",
		Name: "Bouvet Island",
	},
	{
		Code: "BR",
		Name: "Brazil",
	},
	{
		Code: "IO",
		Name: "British Indian Ocean Territory",
	},
	{
		Code: "BN",
		Name: "Brunei Darussalam",
	},
	{
		Code: "BG",
		Name: "Bulgaria",
	},
	{
		Code: "BF",
		Name: "Burkina Faso",
	},
	{
		Code: "BI",
		Name: "Burundi",
	},
	{
		Code: "KH",
		Name: "Cambodia",
	},
	{
		Code: "CM",
		Name: "Cameroon",
	},
	{
		Code: "CA",
		Name: "Canada",
	},
	{
		Code: "CV",
		Name: "Cape Verde",
	},
	{
		Code: "KY",
		Name: "Cayman Islands",
	},
	{
		Code: "CF",
		Name: "Central African Republic",
	},
	{
		Code: "TD",
		Name: "Chad",
	},
	{
		Code: "CL",
		Name: "Chile",
	},
	{
		Code: "CN",
		Name: "China",
	},
	{
		Code: "CX",
		Name: "Christmas Island",
	},
	{
		Code: "CC",
		Name: "Cocos (Keeling) Islands",
	},
	{
		Code: "CO",
		Name: "Colombia",
	},
	{
		Code: "KM",
		Name: "Comoros",
	},
	{
		Code: "CG",
		Name: "Congo",
	},
	{
		Code: "CD",
		Name: "Congo, the Democratic Republic of the",
	},
	{
		Code: "CK",
		Name: "Cook Islands",
	},
	{
		Code: "CR",
		Name: "Costa Rica",
	},
	{
		Code: "CI",
		Name: "Côte d'Ivoire",
	},
	{
		Code: "HR",
		Name: "Croatia",
	},
	{
		Code: "CU",
		Name: "Cuba",
	},
	{
		Code: "CW",
		Name: "Curaçao",
	},
	{
		Code: "CY",
		Name: "Cyprus",
	},
	{
		Code: "CZ",
		Name: "Czech Republic",
	},
	{
		Code: "DK",
		Name: "Denmark",
	},
	{
		Code: "DJ",
		Name: "Djibouti",
	},
	{
		Code: "DM",
		Name: "Dominica",
	},
	{
		Code: "DO",
		Name: "Dominican Republic",
	},
	{
		Code: "EC",
		Name: "Ecuador",
	},
	{
		Code: "EG",
		Name: "Egypt",
	},
	{
		Code: "SV",
		Name: "El Salvador",
	},
	{
		Code: "GQ",
		Name: "Equatorial Guinea",
	},
	{
		Code: "ER",
		Name: "Eritrea",
	},
	{
		Code: "EE",
		Name: "Estonia",
	},
	{
		Code: "ET",
		Name: "Ethiopia",
	},
	{
		Code: "FK",
		Name: "Falkland Islands (Malvinas)",
	},
	{
		Code: "FO",
		Name: "Faroe Islands",
	},
	{
		Code: "FJ",
		Name: "Fiji",
	},
	{
		Code: "FI",
		Name: "Finland",
	},
	{
		Code: "FR",
		Name: "France",
	},
	{
		Code: "GF",
		Name: "French Guiana",
	},
	{
		Code: "PF",
		Name: "French Polynesia",
	},
	{
		Code: "TF",
		Name: "French Southern Territories",
	},
	{
		Code: "GA",
		Name: "Gabon",
	},
	{
		Code: "GM",
		Name: "Gambia",
	},
	{
		Code: "GE",
		Name: "Georgia",
	},
	{
		Code: "DE",
		Name: "Germany",
	},
	{
		Code: "GH",
		Name: "Ghana",
	},
	{
		Code: "GI",
		Name: "Gibraltar",
	},
	{
		Code: "GR",
		Name: "Greece",
	},
	{
		Code: "GL",
		Name: "Greenland",
	},
	{
		Code: "GD",
		Name: "Grenada",
	},
	{
		Code: "GP",
		Name: "Guadeloupe",
	},
	{
		Code: "GU",
		Name: "Guam",
	},
	{
		Code: "GT",
		Name: "Guatemala",
	},
	{
		Code: "GG",
		Name: "Guernsey",
	},
	{
		Code: "GN",
		Name: "Guinea",
	},
	{
		Code: "GW",
		Name: "Guinea-Bissau",
	},
	{
		Code: "GY",
		Name: "Guyana",
	},
	{
		Code: "HT",
		Name: "Haiti",
	},
	{
		Code: "HM",
		Name: "Heard Island and McDonald Islands",
	},
	{
		Code: "VA",
		Name: "Holy See (Vatican City State)",
	},
	{
		Code: "HN",
		Name: "Honduras",
	},
	{
		Code: "HK",
		Name: "Hong Kong",
	},
	{
		Code: "HU",
		Name: "Hungary",
	},
	{
		Code: "IS",
		Name: "Iceland",
	},
	{
		Code: "IN",
		Name: "India",
	},
	{
		Code: "ID",
		Name: "Indonesia",
	},
	{
		Code: "IR",
		Name: "Iran, Islamic Republic of",
	},
	{
		Code: "IQ",
		Name: "Iraq",
	},
	{
		Code: "IE",
		Name: "Ireland",
	},
	{
		Code: "IM",
		Name: "Isle of Man",
	},
	{
		Code: "IL",
		Name: "Israel",
	},
	{
		Code: "IT",
		Name: "Italy",
	},
	{
		Code: "JM",
		Name: "Jamaica",
	},
	{
		Code: "JP",
		Name: "Japan",
	},
	{
		Code: "JE",
		Name: "Jersey",
	},
	{
		Code: "JO",
		Name: "Jordan",
	},
	{
		Code: "KZ",
		Name: "Kazakhstan",
	},
	{
		Code: "KE",
		Name: "Kenya",
	},
	{
		Code: "KI",
		Name: "Kiribati",
	},
	{
		Code: "KP",
		Name: "Korea, Democratic People's Republic of",
	},
	{
		Code: "KR",
		Name: "Korea, Republic of",
	},
	{
		Code: "KW",
		Name: "Kuwait",
	},
	{
		Code: "KG",
		Name: "Kyrgyzstan",
	},
	{
		Code: "LA",
		Name: "Lao People's Democratic Republic",
	},
	{
		Code: "LV",
		Name: "Latvia",
	},
	{
		Code: "LB",
		Name: "Lebanon",
	},
	{
		Code: "LS",
		Name: "Lesotho",
	},
	{
		Code: "LR",
		Name: "Liberia",
	},
	{
		Code: "LY",
		Name: "Libya",
	},
	{
		Code: "LI",
		Name: "Liechtenstein",
	},
	{
		Code: "LT",
		Name: "Lithuania",
	},
	{
		Code: "LU",
		Name: "Luxembourg",
	},
	{
		Code: "MO",
		Name: "Macao",
	},
	{
		Code: "MK",
		Name: "Macedonia, the Former Yugoslav Republic of",
	},
	{
		Code: "MG",
		Name: "Madagascar",
	},
	{
		Code: "MW",
		Name: "Malawi",
	},
	{
		Code: "MY",
		Name: "Malaysia",
	},
	{
		Code: "MV",
		Name: "Maldives",
	},
	{
		Code: "ML",
		Name: "Mali",
	},
	{
		Code: "MT",
		Name: "Malta",
	},
	{
		Code: "MH",
		Name: "Marshall Islands",
	},
	{
		Code: "MQ",
		Name: "Martinique",
	},
	{
		Code: "MR",
		Name: "Mauritania",
	},
	{
		Code: "MU",
		Name: "Mauritius",
	},
	{
		Code: "YT",
		Name: "Mayotte",
	},
	{
		Code: "MX",
		Name: "Mexico",
	},
	{
		Code: "FM",
		Name: "Micronesia, Federated States of",
	},
	{
		Code: "MD",
		Name: "Moldova, Republic of",
	},
	{
		Code: "MC",
		Name: "Monaco",
	},
	{
		Code: "MN",
		Name: "Mongolia",
	},
	{
		Code: "ME",
		Name: "Montenegro",
	},
	{
		Code: "MS",
		Name: "Montserrat",
	},
	{
		Code: "MA",
		Name: "Morocco",
	},
	{
		Code: "MZ",
		Name: "Mozambique",
	},
	{
		Code: "MM",
		Name: "Myanmar",
	},
	{
		Code: "NA",
		Name: "Namibia",
	},
	{
		Code: "NR",
		Name: "Nauru",
	},
	{
		Code: "NP",
		Name: "Nepal",
	},
	{
		Code: "NL",
		Name: "Netherlands",
	},
	{
		Code: "NC",
		Name: "New Caledonia",
	},
	{
		Code: "NZ",
		Name: "New Zealand",
	},
	{
		Code: "NI",
		Name: "Nicaragua",
	},
	{
		Code: "NE",
		Name: "Niger",
	},
	{
		Code: "NG",
		Name: "Nigeria",
	},
	{
		Code: "NU",
		Name: "Niue",
	},
	{
		Code: "NF",
		Name: "Norfolk Island",
	},
	{
		Code: "MP",
		Name: "Northern Mariana Islands",
	},
	{
		Code: "NO",
		Name: "Norway",
	},
	{
		Code: "OM",
		Name: "Oman",
	},
	{
		Code: "PK",
		Name: "Pakistan",
	},
	{
		Code: "PW",
		Name: "Palau",
	},
	{
		Code: "PS",
		Name: "Palestine, State of",
	},
	{
		Code: "PA",
		Name: "Panama",
	},
	{
		Code: "PG",
		Name: "Papua New Guinea",
	},
	{
		Code: "PY",
		Name: "Paraguay",
	},
	{
		Code: "PE",
		Name: "Peru",
	},
	{
		Code: "PH",
		Name: "Philippines",
	},
	{
		Code: "PN",
		Name: "Pitcairn",
	},
	{
		Code: "PL",
		Name: "Poland",
	},
	{
		Code: "PT",
		Name: "Portugal",
	},
	{
		Code: "PR",
		Name: "Puerto Rico",
	},
	{
		Code: "QA",
		Name: "Qatar",
	},
	{
		Code: "RE",
		Name: "Réunion",
	},
	{
		Code: "RO",
		Name: "Romania",
	},
	{
		Code: "RU",
		Name: "Russian Federation",
	},
	{
		Code: "RW",
		Name: "Rwanda",
	},
	{
		Code: "BL",
		Name: "Saint Barthélemy",
	},
	{
		Code: "SH",
		Name: "Saint Helena, Ascension and Tristan da Cunha",
	},
	{
		Code: "KN",
		Name: "Saint Kitts and Nevis",
	},
	{
		Code: "LC",
		Name: "Saint Lucia",
	},
	{
		Code: "MF",
		Name: "Saint Martin (French part)",
	},
	{
		Code: "PM",
		Name: "Saint Pierre and Miquelon",
	},
	{
		Code: "VC",
		Name: "Saint Vincent and the Grenadines",
	},
	{
		Code: "WS",
		Name: "Samoa",
	},
	{
		Code: "SM",
		Name: "San Marino",
	},
	{
		Code: "ST",
		Name: "Sao Tome and Principe",
	},
	{
		Code: "SA",
		Name: "Saudi Arabia",
	},
	{
		Code: "SN",
		Name: "Senegal",
	},
	{
		Code: "RS",
		Name: "Serbia",
	},
	{
		Code: "SC",
		Name: "Seychelles",
	},
	{
		Code: "SL",
		Name: "Sierra Leone",
	},
	{
		Code: "SG",
		Name: "Singapore",
	},
	{
		Code: "SX",
		Name: "Sint Maarten (Dutch part)",
	},
	{
		Code: "SK",
		Name: "Slovakia",
	},
	{
		Code: "SI",
		Name: "Slovenia",
	},
	{
		Code: "SB",
		Name: "Solomon Islands",
	},
	{
		Code: "SO",
		Name: "Somalia",
	},
	{
		Code: "ZA",
		Name: "South Africa",
	},
	{
		Code: "GS",
		Name: "South Georgia and the South Sandwich Islands",
	},
	{
		Code: "SS",
		Name: "South Sudan",
	},
	{
		Code: "ES",
		Name: "Spain",
	},
	{
		Code: "LK",
		Name: "Sri Lanka",
	},
	{
		Code: "SD",
		Name: "Sudan",
	},
	{
		Code: "SR",
		Name: "Suriname",
	},
	{
		Code: "SJ",
		Name: "Svalbard and Jan Mayen",
	},
	{
		Code: "SZ",
		Name: "Swaziland",
	},
	{
		Code: "SE",
		Name: "Sweden",
	},
	{
		Code: "CH",
		Name: "Switzerland",
	},
	{
		Code: "SY",
		Name: "Syrian Arab Republic",
	},
	{
		Code: "TW",
		Name: "Taiwan, Province of China",
	},
	{
		Code: "TJ",
		Name: "Tajikistan",
	},
	{
		Code: "TZ",
		Name: "Tanzania, United Republic of",
	},
	{
		Code: "TH",
		Name: "Thailand",
	},
	{
		Code: "TL",
		Name: "Timor-Leste",
	},
	{
		Code: "TG",
		Name: "Togo",
	},
	{
		Code: "TK",
		Name: "Tokelau",
	},
	{
		Code: "TO",
		Name: "Tonga",
	},
	{
		Code: "TT",
		Name: "Trinidad and Tobago",
	},
	{
		Code: "TN",
		Name: "Tunisia",
	},
	{
		Code: "TR",
		Name: "Turkey",
	},
	{
		Code: "TM",
		Name: "Turkmenistan",
	},
	{
		Code: "TC",
		Name: "Turks and Caicos Islands",
	},
	{
		Code: "TV",
		Name: "Tuvalu",
	},
	{
		Code: "UG",
		Name: "Uganda",
	},
	{
		Code: "UA",
		Name: "Ukraine",
	},
	{
		Code: "AE",
		Name: "United Arab Emirates",
	},
	{
		Code: "GB",
		Name: "United Kingdom",
	},
	{
		Code: "US",
		Name: "United States",
	},
	{
		Code: "UM",
		Name: "United States Minor Outlying Islands",
	},
	{
		Code: "UY",
		Name: "Uruguay",
	},
	{
		Code: "UZ",
		Name: "Uzbekistan",
	},
	{
		Code: "VU",
		Name: "Vanuatu",
	},
	{
		Code: "VE",
		Name: "Venezuela, Bolivarian Republic of",
	},
	{
		Code: "VN",
		Name: "Viet Nam",
	},
	{
		Code: "VG",
		Name: "Virgin Islands, British",
	},
	{
		Code: "VI",
		Name: "Virgin Islands, U.S.",
	},
	{
		Code: "WF",
		Name: "Wallis and Futuna",
	},
	{
		Code: "EH",
		Name: "Western Sahara",
	},
	{
		Code: "YE",
		Name: "Yemen",
	},
	{
		Code: "ZM",
		Name: "Zambia",
	},
	{
		Code: "ZW",
		Name: "Zimbabwe",
	},
];
export const users = [
  {
    id: "1",
    img: imgs.seller1,
    name: "Bhai jan ADMIN",
    number: 4,
    active: true,
  },
  {
    id: "2",
    img: imgs.provider1,
    name: "Bhai jan ADMIN",
    number: 2,
    active: true,
  },
  {
    id: "3",
    img: imgs.provider2,
    name: "Bhai jan ADMIN",
    number: 1,
    active: true,
  },
  {
    id: "4",
    img: imgs.provider3,
    name: "Bhai jan ADMIN",
    number: 0,
    active: false,
  },
  {
    id: "5",
    img: imgs.seller1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: false,
  },
  {
    id: "6",
    img: imgs.provider3,
    name: "Bhai jan ADMIN",
    number: 0,
    active: false,
  },
  {
    id: "7",
    img: imgs.provider1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "8",
    img: imgs.provider2,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "9",
    img: imgs.provider1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "xnbxcvbvb6887",
    img: imgs.provider1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "237643875ufdh",
    img: imgs.provider3,
    name: "Bhai jan ADMIN",
    number: 0,
    active: true,
  },
  {
    id: "dwhgsd78",
    img: imgs.seller1,
    name: "Bhai jan ADMIN",
    number: 0,
    active: false,
  },
];

export const conversations = [
  {
    id: "jakh089",
    img: imgs.seller1,
    message: "Hi Jov Dov",
    time: "8:00 PM",
    isOwn: false,
  },
  {
    id: "89832867tigghwei567",
    img: imgs.provider1,
    message: "What sup",
    time: "8:00 PM",
    isOwn: true,
  },
  {
    id: "mnjksd7832903544",
    img: imgs.provider3,
    message: "Lorem ipsum hassince the 257678suusdh",
    time: "8:00 PM",
    isOwn: false,
  },
  {
    id: "poiuas567nhg34",
    img: imgs.seller1,
    message: "Lorem ipsum hasipsum has been  been the industry ",
    time: "8:00 PM",
    isOwn: true,
  },
  {
    id: "zc32nb76mn",
    img: imgs.provider1,
    message: "Lorem ipsum has been the industry",
    time: "8:00 PM",
    isOwn: false,
  },
  {
    id: "099yu6",
    img: imgs.provider3,
    message:
      "Lorem ipsum has been the industry standard dummy psum standard dummy text ever since",
    time: "8:00 PM",
    isOwn: false,
  },
  {
    id: 7,
    img: imgs.provider1,
    message:
      "Lorem ipsum has been the industry standard dummy text ever standard dummy text ever",
    time: "8:00 PM",
    isOwn: true,
  },
  {
    id: "ghoqw97778",
    img: imgs.provider2,
    message: "Lorem ipsum has ever standard dummy text ever",
    time: "8:00 PM",
    isOwn: true,
  },
  {
    id: "6677565ythg",
    img: imgs.provider3,
    message:
      "Lorem ipsum has been the industry standard dummy text ever standard dummy text ever",
    time: "8:00 PM",
    isOwn: false,
  },
];

export const ProviderData = [
  {
    id: "#1",
    providerName: "Lativari dress",
    img: imgs.provider1,
    email: "dress@gmail.com",
    phone: "08107564512",
    status: "Verified",
  },
  {
    id: "#2",
    providerName: "Lativari dress",
    img: imgs.provider1,
    email: "dress@gmail.com",
    phone: "08107564512",
    status: "Pending",
  },
  {
    id: "#3",
    providerName: "Lativari dress",
    img: imgs.provider1,
    email: "dress@gmail.com",
    phone: "08107564512",
    status: "Under review",
  },
  {
    id: "#4",
    providerName: "Lativari dress",
    img: imgs.provider1,
    email: "dress@gmail.com",
    phone: "08107564512",
    status: "Deleted",
  },
  {
    id: "#5",
    providerName: "Lativari dress",
    img: imgs.provider1,
    email: "dress@gmail.com",
    phone: "08107564512",
    status: "Rejected",
  },
  {
    id: "#6",
    providerName: "Lativari dress",
    img: imgs.provider1,
    email: "dress@gmail.com",
    phone: "08107564512",
    status: "Pending",
  },
];
export const bookingsData = [
  {
    id: "#1",
    status: "Active",
  },
  {
    id: "#2",
    status: "Pending",
  },
  {
    id: "#3",
    status: "Active",
  },
  {
    id: "#4",
    status: "Deleted",
  },
  {
    id: "#5",
    status: "Inactive",
  },
  {
    id: "#6",
    status: "Pending",
  },
];
export const customersData = [
  {
    id: "#1",
    status: "Active",
    lastActivity: "Online",
  },
  {
    id: "#2",
    status: "Inactive",
    lastActivity: "Offline",
  },
  {
    id: "#3",
    status: "Active",
    lastActivity: "Offline",
  },
  {
    id: "#4",
    status: "Deleted",
    lastActivity: "Online",
  },
  {
    id: "#5",
    status: "Inactive",
    lastActivity: "Offline",
  },
  {
    id: "#6",
    status: "Inactive",
    lastActivity: "Online",
  },
];
export const customerDetailsData = [
  {
    id: "#1",
    status: "Processing",
  },
  {
    id: "#2",
    status: "Canceled",
  },
  {
    id: "#3",
    status: "Completed",
  },
  {
    id: "#4",
    status: "Processing",
  },
  {
    id: "#5",
    status: "Completed",
  },
];
export const reportData = [
  {
    id: "#1",
    description:
      "server IP address could not be found address could not be found.address could not be found.address could not be found.address could not be found address.",
  },
  {
    id: "#2",
    description: "The servrice provider could not meet up to the date.",
  },
  {
    id: "#3",
    description: "server IP address could not be found.",
  },
  {
    id: "#4",
    description: "The servrice provider did not come.",
  },
  {
    id: "#5",
    description: "server IP address could not be found.",
  },
  {
    id: "#6",
    description: "The servrice provider did not come.",
  },
];
export const reviewData = [
  {
    id: "#1",
    type: "Normal",
    ratings: 3.0,
    description: "server IP address could not be found.",
  },
  {
    id: "#2",
    type: "Excellent",
    ratings: 4.9,
    description: "The servrice provider could not meet up to the date.",
  },
  {
    id: "#3",
    type: "High",
    ratings: 3.5,
    description: "server IP address could not be found.",
  },
  {
    id: "#4",
    type: "Normal",
    ratings: 2.0,
    description: "The servrice provider did not come.",
  },
  {
    id: "#5",
    type: "High",
    ratings: 4.5,
    description: "server IP address could not be found.",
  },
  {
    id: "#6",
    type: "Normal",
    ratings: 3.5,
    description: "The servrice provider did not come.",
  },
];
export const OtherTransactionsData = [
  {
    transactionId: "#6545",
    summary: "Afruna pay has credited you for list item bought.",
    event: "Credited",
  },
  {
    transactionId: "#6545",
    summary: "Afruna pay has item bought.",
    event: "Withdrawal",
  },
  {
    transactionId: "#6545",
    summary: "Afruna for list item bought.",
    event: "Listing fee",
  },
  {
    transactionId: "#6545",
    summary: "Afruna pay has item bought.",
    event: "Withdrawal",
  },
  {
    transactionId: "#6545",
    summary: "Afruna for list item bought.",
    event: "Listing fee",
  },
  {
    transactionId: "#6545",
    summary: "Afruna pay has item bought.",
    event: "Withdrawal",
  },
  {
    transactionId: "#6545",
    summary: "Afruna for list item bought.",
    event: "Listing fee",
  },
  {
    transactionId: "#6545",
    summary: "Afruna pay has item bought.",
    event: "Withdrawal",
  },
  {
    transactionId: "#6545",
    summary: "Afruna for list item bought.",
    event: "Listing fee",
  },
];
export const BookingTransactionsData = [
  {
    id: "1",
    status: "Successful",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "2",
    status: "Failed",
    paymentMethod: "Master card",
  },
  {
    id: "3",
    status: "Successful",
    paymentMethod: "Transfer",
  },
  {
    id: "4",
    status: "Successful",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "5",
    status: "Failed",
    paymentMethod: "Master card",
  },
  {
    id: "6",
    status: "Successful",
    paymentMethod: "Cash on Delivery",
  },
];
export const DashboardStats = [
  {
    number: "#34,5798",
    title: "Income",
    desc: "Current month",
  },
  {
    number: "73",
    title: "Users",
    desc: "Total Registerd: 30",
  },
  {
    number: "37",
    title: "Providers",
    desc: "Total Registerd: 30",
  },
  {
    number: "34",
    title: "Service",
    desc: "Total Registerd: 30",
  },
];
export const TopService = [
  {
    id: "1",
    amount: "#3500",
  },
  {
    id: "2",
    amount: "#2500",
  },
  {
    id: "3",
    amount: "#1500",
  },
  {
    id: "4",
    amount: "#3000",
  },
  {
    id: "5",
    amount: "#4500",
  },
  {
    id: "6",
    amount: "#5500",
  },
];
export const service = [
  {
    id: "#1",
    status: "Active",
    created_by: "Provider",
  },
  {
    id: "#2",
    status: "Inactive",
    created_by: "Admin",
  },
  {
    id: "#3",
    status: "Pending",
    created_by: "Provider",
  },
  {
    id: "#4",
    status: "Deleted",
    created_by: "Admin",
  },
  {
    id: "#5",
    status: "Processing",
    created_by: "Provider",
  },
  {
    id: "#6",
    status: "Active",
    created_by: "admin",
  },
  {
    id: "#7",
    status: "Active",
    created_by: "Provider",
  },
  {
    id: "#8",
    status: "Active",
    created_by: "Provider",
  },
  {
    id: "#9",
    status: "Active",
    created_by: "Provider",
  },
  {
    id: "#10",
    status: "Active",
    created_by: "Provider",
  },
];
export const subCategory = [
  {
    id: "#1",
    featured: true
  },
  {
    id: "#2",
    featured: false
  },
  {
    id: "#3",
    featured: true
  },
  {
    id: "#4",
    featured: true
  },
  {
    id: "#5",
    featured: false
  },
  {
    id: "#6",
    featured: true
  },
  {
    id: "#7",
    featured: true
  },
  {
    id: "#8",
    featured: false
  },
  {
    id: "#9",
    featured: true
  },
  {
    id: "#10",
    featured: false
  },
];

export const Colors = [
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733",
  "#FF5733",
  "#45A3E0",
  "#FFC300",
  "#4CAF50",
  "#FF5733"
  // You can add more colors here if needed
];
