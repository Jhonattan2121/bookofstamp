// pages/api/submit-stamp.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});
client.login(process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, username, assetName } = req.body;

    try {
      const channel = await client.channels.fetch(process.env.NEXT_PUBLIC_DISCORD_CHANNEL_ID as string);
      if (channel && channel instanceof TextChannel) {
        channel.send(`New Submission:
        Artist Name: ${name}
        Username: ${username}
        Asset Name: ${assetName}`);
      }

      res.status(200).json({ message: 'Submission sent to Discord' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
