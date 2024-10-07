export const formatAmount = (amount) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(amount);
};
