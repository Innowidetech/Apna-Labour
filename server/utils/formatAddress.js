exports.formatAddress = (address) => {
  if (!address) return "";
  if (typeof address === "string") return address;

  const parts = [
    address.HNo,
    address.street,
    address.area,
    address.landmark,
    address.townCity,
    address.pincode ? address.pincode.toString() : "",
    address.state,
  ];

  return parts.filter(Boolean).join(", ");
};