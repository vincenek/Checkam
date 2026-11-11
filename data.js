// ============================================================
// NETWORK PREFIXES — first 4 digits of the national number.
// Source: NCC prefix assignments. Stable reference data.
// ============================================================
const NETWORK_PREFIXES = {
  // MTN
  "0803": "MTN", "0806": "MTN", "0703": "MTN", "0704": "MTN", "0706": "MTN",
  "0810": "MTN", "0813": "MTN", "0814": "MTN", "0816": "MTN",
  "0903": "MTN", "0906": "MTN", "0913": "MTN", "0916": "MTN",
  // Airtel
  "0802": "Airtel", "0808": "Airtel", "0708": "Airtel", "0812": "Airtel",
  "0701": "Airtel", "0901": "Airtel", "0902": "Airtel", "0904": "Airtel",
  "0907": "Airtel", "0912": "Airtel",
  // Glo
  "0805": "Glo", "0807": "Glo", "0705": "Glo", "0811": "Glo",
  "0815": "Glo", "0905": "Glo", "0915": "Glo",
  // 9mobile
  "0809": "9mobile", "0817": "9mobile", "0818": "9mobile",
  "0908": "9mobile", "0909": "9mobile",
  // Others
  "0702": "Smile", "0804": "Ntel", "0709": "Openskys"
};

// ============================================================
// NIGERIAN BANK CODES — for reference only.
// Verify with CBN or your bank before using in production.
// ============================================================
const BANKS = [
  { name: "Access Bank", code: "044", type: "Commercial" },
  { name: "Citibank Nigeria", code: "023", type: "Commercial" },
  { name: "Ecobank Nigeria", code: "050", type: "Commercial" },
  { name: "Fidelity Bank", code: "070", type: "Commercial" },
  { name: "First Bank of Nigeria", code: "011", type: "Commercial" },
  { name: "First City Monument Bank (FCMB)", code: "214", type: "Commercial" },
  { name: "Globus Bank", code: "103", type: "Commercial" },
  { name: "Guaranty Trust Bank (GTBank)", code: "058", type: "Commercial" },
  { name: "Heritage Bank", code: "030", type: "Commercial" },
  { name: "Jaiz Bank", code: "301", type: "Non-interest" },
  { name: "Keystone Bank", code: "082", type: "Commercial" },
  { name: "Optimus Bank", code: "107", type: "Commercial" },
  { name: "Parallex Bank", code: "104", type: "Commercial" },
  { name: "Polaris Bank", code: "076", type: "Commercial" },
  { name: "Premium Trust Bank", code: "105", type: "Commercial" },
  { name: "Providus Bank", code: "101", type: "Commercial" },
  { name: "Signature Bank", code: "106", type: "Commercial" },
  { name: "Stanbic IBTC Bank", code: "221", type: "Commercial" },
  { name: "Standard Chartered Bank", code: "068", type: "Commercial" },
  { name: "Sterling Bank", code: "232", type: "Commercial" },
  { name: "SunTrust Bank", code: "100", type: "Commercial" },
  { name: "Taj Bank", code: "302", type: "Non-interest" },
  { name: "Titan Trust Bank", code: "102", type: "Commercial" },
  { name: "Union Bank of Nigeria", code: "032", type: "Commercial" },
  { name: "United Bank for Africa (UBA)", code: "033", type: "Commercial" },
  { name: "Unity Bank", code: "215", type: "Commercial" },
  { name: "Wema Bank", code: "035", type: "Commercial" },
  { name: "Zenith Bank", code: "057", type: "Commercial" },
  { name: "Kuda Bank", code: "50211", type: "Microfinance / Digital" },
  { name: "Opay", code: "999992", type: "Mobile money" },
  { name: "PalmPay", code: "999991", type: "Mobile money" },
  { name: "Moniepoint", code: "50515", type: "Microfinance / Digital" },
  { name: "FairMoney", code: "51318", type: "Microfinance / Digital" },
  { name: "Carbon", code: "565", type: "Digital" },
  { name: "Sparkle", code: "51310", type: "Digital" },
  { name: "Rubies Bank", code: "125", type: "Microfinance" },
  { name: "Lotus Bank", code: "303", type: "Non-interest" },
  { name: "FSDH Merchant Bank", code: "501", type: "Merchant" },
  { name: "Rand Merchant Bank", code: "502", type: "Merchant" },
  { name: "Coronation Merchant Bank", code: "559", type: "Merchant" },
  { name: "Nova Merchant Bank", code: "561", type: "Merchant" }
];
