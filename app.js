const
    {intersection} = require('lodash'),
    dotenv = require('dotenv').config(),

    ftx = require('./cex/ftx'),
    btcturk = require('./cex/btcturk'),
    {makeNotifier} = require('./notify'),

    threshold = parseFloat(process.env.THRESHOLD)


const
    main = async () => {
        const
            ftxTicker = (await ftx.getTickers())
                .map(t => ({
                    ...t,
                    name: t.name.replace('TRYB/USD', 'USD/TRYB'),
                    ask: t.name === 'TRYB/USD' ? 1 / t.bid : t.ask,
                    bid: t.name === 'TRYB/USD' ? 1 / t.ask : t.bid,
                })),
            btcturkTicker = (await btcturk.getTickers())
                .map(t => ({
                    ...t,
                    name: t.pairNormalized.replace('_', '/').replace('USDT', 'USD').replace('TRY', 'TRYB'),
                })),

            ftxMarkets = ftxTicker
                .map(t => t.name),

            bcturkMarkets = btcturkTicker
                .map(t => t.name),

            intersections = intersection(ftxMarkets, bcturkMarkets),

            ftxShit = ftxTicker
                .filter(t => intersections.includes(t.name))
                .map(t => ({
                    name: t.name,
                    ask: t.ask,
                    bid: t.bid,
                })),

            btcturkShit = btcturkTicker
                .filter(t => intersections.includes(t.name))
                .map(t => ({
                    name: t.name,
                    ask: t.ask,
                    bid: t.bid,
                })),

            arotus = []

        ftxShit.forEach(ft => {
            const
                bt = btcturkShit.find(bt => ft.name === bt.name),

                ftToBt = (bt.bid / ft.ask - 1) * 100 - 0.0018 - 0.0007 - 0.003,
                btToFt = (ft.bid / bt.ask - 1) * 100 - 0.0018 - 0.0007 - 0.003

            if (ftToBt > threshold)
                arotus.push(
                    `Pair: ${ft.name} ` +
                    `Est. Profit: %${ftToBt} ` +
                    'BUY at FTX, SELL at BTCTURK',
                )

            if (btToFt > threshold)
                arotus.push(
                    `Pair: ${ft.name} ` +
                    `Est. Profit: %${btToFt} ` +
                    'BUY at BTCTURK, SELL at FTX',
                )
        })

        if (arotus.length)
            sendNotification(arotus)
    },

    sendNotification = (
        arbits,
    ) =>
        makeNotifier.slack({
            title: 'New arbit alert',
            subtitle: 'Possible # of positions: ' + arbits.length,
            text: arbits.join('\n') + '<!channel>',
        })

main()
