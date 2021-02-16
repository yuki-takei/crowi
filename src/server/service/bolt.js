const logger = require('@alias/logger')('growi:service:BoltService');

class BoltReciever {

  init(app) {
    this.bolt = app;
  }

  async requestHandler(req, res) {
    let ackCalled = false;

    // for verification request URL on Event Subscriptions
    if (req.body.challenge && req.body.type) {
      return res.send(req.body);
    }

    const event = {
      body: req.body,
      ack: (response) => {
        if (ackCalled) {
          return;
        }

        if (response instanceof Error) {
          res.status(500).send();
        }
        else if (!response) {
          res.send('');
        }
        else {
          res.send(response);
        }

        ackCalled = true;
      },
    };

    await this.bolt.processEvent(event);
  }

}

const { App } = require('@slack/bolt');
const { WebClient, LogLevel } = require('@slack/web-api');

class BoltService {

  constructor(crowi) {
    this.crowi = crowi;
    this.receiver = new BoltReciever();

    const signingSecret = crowi.configManager.getConfig('crowi', 'slackbot:signingSecret');
    const token = crowi.configManager.getConfig('crowi', 'slackbot:token');

    const client = new WebClient(token, { logLevel: LogLevel.DEBUG });
    this.client = client;

    if (token != null || signingSecret != null) {
      logger.debug('TwitterStrategy: setup is done');
      this.bolt = new App({
        token,
        signingSecret,
        receiver: this.receiver,
      });
      this.init();
    }
  }

  init() {
    // Example of listening for event
    // See. https://github.com/slackapi/bolt-js#listening-for-events
    // or https://slack.dev/bolt-js/concepts#basic
    this.bolt.command('/growi-bot', async({ command, ack, say }) => { // demo
      await say('Hello');
    });

    // The echo command simply echoes on command
    this.bolt.command('/echo', async({ command, ack, say }) => {
      // Acknowledge command request
      await ack();

      await say(`${command.text}`);
    });

    this.bolt.command('/growi', async({ command, ack }) => {
      await ack();
      const inputSlack = command.text.split(' ');
      const firstArg = inputSlack[0];

      switch (firstArg) {
        case 'search':
          this.searchResults(command, inputSlack);
          break;

        case 'create':
          console.log('create');
          break;

        default:
          this.notCommand(command);
          break;
      }
    });

  }

  notCommand(command) {
    logger.error('Input first arguments');
    return this.client.chat.postEphemeral({
      channel: command.channel_id,
      user: command.user_id,
      blocks: [
        this.generateMarkdownSectionBlock('*コマンドが存在しません。*\n Hint\n `/growi [command] [keyword]`'),
      ],
    });

  }

  async searchResults(command, inputSlack) {
    console.log(inputSlack);
    const growiCommand = inputSlack[0];
    const keyword = inputSlack[1];

    if (growiCommand == null) {
      return this.client.chat.postEphemeral({
        channel: command.channel_id,
        user: command.user_id,
        blocks: [
          this.generateMarkdownSectionBlock('*キーワードを入力してください。*\n Hint\n `/growi search [keyword]`'),
        ],
      });
    }

    const { searchService } = this.crowi;
    const option = { limit: 10 };
    const results = await searchService.searchKeyword(keyword, null, {}, option);

    // no search results
    if (results.data.length === 0) {
      return this.client.chat.postEphemeral({
        channel: command.channel_id,
        user: command.user_id,
        blocks: [
          this.generateMarkdownSectionBlock('*キーワードに該当するページは存在しません。*'),
        ],
      });
    }

    const resultPaths = results.data.map((data) => {
      return data._source.path;
    });

    try {
      await this.client.chat.postEphemeral({
        channel: command.channel_id,
        user: command.user_id,
        blocks: [
          this.generateMarkdownSectionBlock('検索結果 10 件'),
          this.generateMarkdownSectionBlock(`${resultPaths.join('\n')}`),
        ],
      });
    }
    catch {
      logger.error('Failed to get search results.');
      await this.client.chat.postEphemeral({
        channel: command.channel_id,
        user: command.user_id,
        blocks: [
          this.generateMarkdownSectionBlock('*検索に失敗しました。*\n Hint\n `/growi search [keyword]`'),
        ],
      });
    }
  }

  generateMarkdownSectionBlock(blocks) {
    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: blocks,
      },
    };
  }

}

module.exports = BoltService;
