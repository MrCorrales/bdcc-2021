const Countries = {
  //data: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antartica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ashmore and Cartier Island", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czeck Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands (Islas Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "Gambia, The", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Glorioso Islands", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Howland Island", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Ireland, Northern", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jarvis Island", "Jersey", "Johnston Atoll", "Jordan", "Juan de Nova Island", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Man, Isle of", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Midway Islands", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcaim Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romainia", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Scotland", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and South Sandwich Islands", "Spain", "Spratly Islands", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tobago", "Toga", "Tokelau", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "USA", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wales", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"],


  data: [
    {
      "countryCode":"US",
      "countryName": "United States",
      "phoneCode": "+1"
    },
    {
      "countryCode":"CA",
      "countryName": "Canada",
      "phoneCode": "+1"
    },
    {
      "countryCode":"UK",
      "countryName": "United Kingdom",
      "phoneCode": "+44"
    },
    {
      "countryCode":"AF",
      "countryName": "Afghanistan",
      "phoneCode": "+93"
    },
    {
      "countryCode":"AR",
      "countryName": "Argentina",
      "phoneCode": "+54"
    },
    {
      "countryCode":"AT",
      "countryName": "Austria",
      "phoneCode": "+43"
    },
    {
      "countryCode":"AU",
      "countryName": "Australia",
      "phoneCode": "+61"
    },
    {
      "countryCode":"BH",
      "countryName": "Bahrain",
      "phoneCode": "+973"
    },
    {
      "countryCode":"BD",
      "countryName": "Bengal",
      "phoneCode": "+880"
    },
    {
      "countryCode":"BE",
      "countryName": "Belgium",
      "phoneCode": "+32"
    },
    {
      "countryCode":"BT",
      "countryName": "Bhutan",
      "phoneCode": "+975"
    },
    {
      "countryCode":"BO",
      "countryName": "Bolivia",
      "phoneCode": "+591"
    },
    {
      "countryCode":"BR",
      "countryName": "Brazil",
      "phoneCode": "+55"
    },
    {
      "countryCode":"KH",
      "countryName": "Cambodia",
      "phoneCode": "+855"
    },
    {
      "countryCode":"CM",
      "countryName": "Cameroon",
      "phoneCode": "+237"
    },
    {
      "countryCode":"CN",
      "countryName": "China",
      "phoneCode": "+86"
    },
    {
      "countryCode":"AI",
      "countryName": "Anguilla",
      "phoneCode": "+1264"
    },
    {
      "countryCode":"AG",
      "countryName": "Antigua",
      "phoneCode": "+1268"
    },
    {
      "countryCode":"AW",
      "countryName": "Aruba",
      "phoneCode": "+297"
    },
    {
      "countryCode":"BM",
      "countryName": "Bermuda",
      "phoneCode": "+1441"
    },
    {
      "countryCode":"DO",
      "countryName": "Dominican",
      "phoneCode": "+1767"
    },
    {
      "countryCode":"GD",
      "countryName": "Grenada",
      "phoneCode": "+1473"
    },
    {
      "countryCode":"LC",
      "countryName": "Saint Lucia",
      "phoneCode": "+1758"
    },
    {
      "countryCode":"CO",
      "countryName": "Colombia",
      "phoneCode": "+57"
    },
    {
      "countryCode":"SG",
      "countryName": "Singapore",
      "phoneCode": "+ˊ65"
    },
    {
      "countryCode":"CG",
      "countryName": "the republic of Congo",
      "phoneCode": "+243"
    },
    {
      "countryCode":"CH",
      "countryName": "Switzerland",
      "phoneCode": "+41"
    },
    {
      "countryCode":"DE",
      "countryName": "Germany",
      "phoneCode": "+49"
    },
    {
      "countryCode":"DK",
      "countryName": "Denmark",
      "phoneCode": "+45"
    },
    {
      "countryCode":"EG",
      "countryName": "Egypt",
      "phoneCode": "+20"
    },
    {
      "countryCode":"ES",
      "countryName": "Spain",
      "phoneCode": "+34"
    },
    {
      "countryCode":"SV",
      "countryName": "El Salvador",
      "phoneCode": "+503"
    },
    {
      "countryCode":"FI",
      "countryName": "Finland",
      "phoneCode": "+358"
    },
    {
      "countryCode":"FJ",
      "countryName": "Fiji",
      "phoneCode": "+679"
    },
    {
      "countryCode":"FR",
      "countryName": "France",
      "phoneCode": "+33"
    },
    {
      "countryCode":"GE",
      "countryName": "Georgia",
      "phoneCode": "+995"
    },
    {
      "countryCode":"GH",
      "countryName": "Ghana",
      "phoneCode": "+233"
    },
    {
      "countryCode":"GR",
      "countryName": "Greece",
      "phoneCode": "+30"
    },
    {
      "countryCode":"GT",
      "countryName": "Guatemala",
      "phoneCode": "+502"
    },
    {
      "countryCode":"GY",
      "countryName": "Guyana",
      "phoneCode": "+967"
    },
    {
      "countryCode":"HT",
      "countryName": "Haiti",
      "phoneCode": "+509"
    },
    {
      "countryCode":"HN",
      "countryName": "Honduras",
      "phoneCode": "+504"
    },
    {
      "countryCode":"HK",
      "countryName": "Hong Kong",
      "phoneCode": "+852"
    },
    {
      "countryCode":"IN",
      "countryName": "India",
      "phoneCode": "+91"
    },
    {
      "countryCode":"IS",
      "countryName": "Iceland",
      "phoneCode": "+354"
    },
    {
      "countryCode":"ID",
      "countryName": "Indonesia",
      "phoneCode": "+62"
    },
    {
      "countryCode":"IQ",
      "countryName": "Iraq",
      "phoneCode": "+964"
    },
    {
      "countryCode":"IE",
      "countryName": "Ireland",
      "phoneCode": "+353"
    },
    {
      "countryCode":"IT",
      "countryName": "Italy",
      "phoneCode": "+39"
    },
    {
      "countryCode":"JM",
      "countryName": "Jamaica",
      "phoneCode": "+1876"
    },
    {
      "countryCode":"JO",
      "countryName": "Jordan",
      "phoneCode": "+962"
    },
    {
      "countryCode":"KZ",
      "countryName": "Kazakhstan",
      "phoneCode": "+7"
    },
    {
      "countryCode":"KE",
      "countryName": "Kenya",
      "phoneCode": "+254"
    },
    {
      "countryCode":"JP",
      "countryName": "Japan",
      "phoneCode": "+81"
    },
    {
      "countryCode":"KP",
      "countryName": "Korea",
      "phoneCode": "+82"
    },
    {
      "countryCode":"KW",
      "countryName": "Kuwait",
      "phoneCode": "+965"
    },
    {
      "countryCode":"LU",
      "countryName": "Luxembourg",
      "phoneCode": "+352"
    },
    {
      "countryCode":"MO",
      "countryName": "Macao",
      "phoneCode": "+853"
    },
    {
      "countryCode":"MK",
      "countryName": "Macedonia",
      "phoneCode": "+389"
    },
    {
      "countryCode":"MG",
      "countryName": "Madagascar",
      "phoneCode": "+261"
    },
    {
      "countryCode":"ML",
      "countryName": "Malaysia",
      "phoneCode": "+60"
    },
    {
      "countryCode":"MV",
      "countryName": "Maldives",
      "phoneCode": "+960"
    },
    {
      "countryCode":"MX",
      "countryName": "Mexico",
      "phoneCode": "+52"
    },
    {
      "countryCode":"MA",
      "countryName": "Morocco",
      "phoneCode": "+212"
    },
    {
      "countryCode":"NO",
      "countryName": "Norway",
      "phoneCode": "+47"
    },
    {
      "countryCode":"NR",
      "countryName": "Noruu",
      "phoneCode": "+674"
    },
    {
      "countryCode":"NZ",
      "countryName": "New Zealand",
      "phoneCode": "+64"
    },
    {
      "countryCode":"NI",
      "countryName": "Nicaragua",
      "phoneCode": "+505"
    },
    {
      "countryCode":"NG",
      "countryName": "Nigeria",
      "phoneCode": "+234"
    },
    {
      "countryCode":"PK",
      "countryName": "Pakistan",
      "phoneCode": "+92"
    },
    {
      "countryCode":"PA",
      "countryName": "Panama",
      "phoneCode": "+507"
    },
    {
      "countryCode":"PG",
      "countryName": "Papua New Guinea",
      "phoneCode": "+675"
    },
    {
      "countryCode":"PT",
      "countryName": "Portugal",
      "phoneCode": "+351"
    },
    {
      "countryCode":"PY",
      "countryName": "Paraguay",
      "phoneCode": "+595"
    },
    {
      "countryCode":"RO",
      "countryName": "Romania",
      "phoneCode": "+40"
    },
    {
      "countryCode":"RU",
      "countryName": "Russia",
      "phoneCode": "+7"
    },
    {
      "countryCode":"RW",
      "countryName": "Rwanda",
      "phoneCode": "+250"
    },
    {
      "countryCode":"SA",
      "countryName": "Saudi Arabia",
      "phoneCode": "+966"
    },
    {
      "countryCode":"SY",
      "countryName": "Syria",
      "phoneCode": "+381"
    },
    {
      "countryCode":"SC",
      "countryName": "Seychelles",
      "phoneCode": "+248"
    },
    {
      "countryCode":"LK",
      "countryName": "Sri Lanka",
      "phoneCode": "+94"
    },
    {
      "countryCode":"SG",
      "countryName": "Singapore",
      "phoneCode": "+65"
    },
    {
      "countryCode":"SD",
      "countryName": "Sudan",
      "phoneCode": "+249"
    },
    {
      "countryCode":"SE",
      "countryName": "Sweden",
      "phoneCode": "+46"
    },
    {
      "countryCode":"TL",
      "countryName": "Thailand",
      "phoneCode": "+66"
    },
    {
      "countryCode":"TW",
      "countryName": "Taiwan",
      "phoneCode": "+886"
    },
    {
      "countryCode":"TO",
      "countryName": "Tonga Islands",
      "phoneCode": "+676"
    },
    {
      "countryCode":"TR",
      "countryName": "Turkey",
      "phoneCode": "+90"
    },
    {
      "countryCode":"UG",
      "countryName": "Uganda",
      "phoneCode": "+256"
    },
    {
      "countryCode":"UA",
      "countryName": "Ukraine",
      "phoneCode": "+380"
    },
    {
      "countryCode":"AE",
      "countryName": "United Arab Emirates",
      "phoneCode": "+971"
    },
    {
      "countryCode":"UY",
      "countryName": "Uruguay",
      "phoneCode": "+598"
    },
    {
      "countryCode":"UZ",
      "countryName": "Uzbekistan",
      "phoneCode": "+998"
    },
    {
      "countryCode":"VE",
      "countryName": "Venezuela",
      "phoneCode": "+58"
    },
    {
      "countryCode":"YE",
      "countryName": "Yemen",
      "phoneCode": "+967"
    }
  ],





  initSelect(__item, __title = "", __country = "") {
    __item.length=0;
    if(__title !== "") {
      __item.options[0] = new Option(__title,'-1');
      __item.selectedIndex = 0;
    }

    for (var i=0; i<this.data.length; i++) {
      let text = this.data[i].countryName + " (" + this.data[i].phoneCode + ")";
      let value = this.data[i].countryName + " (" + this.data[i].phoneCode + ")";
      __item.options[__item.length] = new Option(value,value);

      if(__country !== "" && __country === this.data[i].countryCode) {
        __item.selectedIndex = i;
      }
    }
  }
}