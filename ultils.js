const formatNumber = (money) => {
    if (money === undefined || money === null || money === '') {
        return '0';
    }
    let number = '';
    number = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return number;
}

module.exports = {
    formatNumber
}