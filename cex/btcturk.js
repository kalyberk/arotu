const
    fetch = require('node-fetch'),
    baseUrl = 'https://api.btcturk.com/api/v2',


    getTickers = () =>
        fetch(`${baseUrl}/ticker`)
            .then(res => res.json())
            .then(res => res.data),

    getOrderbook = (marketName, depth) =>
        fetch(`${baseUrl}/orderbook?pairSymbol=${marketName}&limit=${depth}`)
            .then(res => res.json())
            .then(res => res.data)


module.exports = {
    getTickers,
    getOrderbook,
}
