const
    fetch = require('node-fetch'),
    baseUrl = 'https://ftx.com/api',


    getTickers = () =>
        fetch(`${baseUrl}/markets`)
            .then(res => res.json())
            .then(res => res.result),

    getOrderbook = (marketName, depth) =>
        fetch(`${baseUrl}/markets/${marketName}/orderbook?depth=${depth}`)
            .then(res => res.json())
            .then(res => res.result)


module.exports = {
    getTickers,
    getOrderbook,
}
