function formatCurrency(balance) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(balance);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
