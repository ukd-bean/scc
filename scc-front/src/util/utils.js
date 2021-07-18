export function calcPaymentsSum(group, isHiddenMode) {
    let sum = group.payments?.length > 0
      ? group.payments.reduce((commonSum, payment) => {
          const paymentCost = payment.hiddenPayment == 'true' && isHiddenMode ? 0 : payment.cost;
          return commonSum + paymentCost;
        }, 0)
      : 0;
    if (group.children.length > 0) {
        sum += group.children.reduce((common, child) => { return common + calcPaymentsSum(child, isHiddenMode)}, 0);
    }
    return sum;
}

export function dateTimeFormat(value) {
    const date = new Date(value);
    return date.toLocaleDateString("en-GB", { year: 'numeric', month: 'short', day: '2-digit' });
}