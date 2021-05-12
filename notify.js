const
    fetch = require('node-fetch'),

    makeSlackCli = async ({title, subtitle, text}) => {
        const
            slackWebHookUrl = process.env.SLACK_WEBHOOK_URL,

            fetchOpts = {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    attachments: [{
                        author_name: title,
                        title: subtitle,
                        text,
                    }],
                }),
            }

        if (!slackWebHookUrl)
            return console.log({fetchOpts, msg: 'Sending Slack notification'})

        const response = await fetch(slackWebHookUrl, fetchOpts)

        if (!response.ok)
            throw response
    },

    makeNotifier = ({
        slack: makeSlackCli,
    })


module.exports = {
    makeNotifier,
}
