export function calcPaymentsSum(group) {
    let sum = group.payments?.length > 0 ? group.payments.reduce((common, next) => {return common + next.cost}, 0) : 0;
    if (group.children.length > 0) {
        sum += group.children.reduce((common, child) => { return common + calcPaymentsSum(child)}, 0);
    }
    return sum;
}