function formatCurrency(montant: number, currency?: string): string {
    //TODO aller chercher la currency de l'utilisateur ou du groupe
    if(!currency)
        currency = "CHF"


    return `${montant < 0 ? "" : "+"}${montant} ${currency}`;
}

export {formatCurrency}