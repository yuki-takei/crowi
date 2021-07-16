const { BlockKitBuilder: B } = require('@growi/slack');
const { getTime, parse } = require('date-fns');

module.exports = () => {
  const BaseSlackCommandHandler = require('./slack-command-handler');
  const handler = new BaseSlackCommandHandler();

  handler.handleCommand = async(client, body, args, limit = 10) => {

    let latest;
    if (args[1] != null) {
      latest = getTime(parse(args[1], 'HH:mm', new Date()), { locale: 'ja' });
    }
    const reusult = await client.conversations.history({
      channel: body.channel_id,
      limit,
      latest,
    });
    console.log(reusult);
    console.log(latest);
    // console.log(reusult);
    // TODO GW-6712 display checkbox using result
    const message = '*togetterCommand*';
    client.chat.postEphemeral({
      channel: body.channel_id,
      user: body.user_id,
      text: 'togetter',
      blocks: [
        B.generateMarkdownSectionBlock(message),
      ],
    });
    return;
  };

  return handler;
};
