function formatCurrency(montant?: number, currency?: string, showPlusSign?: boolean): string {
  //TODO aller chercher la currency de l'utilisateur ou du groupe
  if (!currency)
    currency = "CHF"

  if (showPlusSign === undefined)
    showPlusSign = true

  return `${montant === undefined ? "∞" : (montant < 0 ? "" : (showPlusSign ? "+" : "")) + (Math.round(montant * 100) / 100)} ${currency}`;
}

export { formatCurrency }