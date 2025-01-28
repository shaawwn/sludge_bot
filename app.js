import "dotenv/config"
import express from 'express'
import {
    InteractionType,
    InteractionResponseType,
    verifyKeyMiddleware,
  } from 'discord-interactions';


// import discord interactions


const app = express();
const PORT = process.env.PORT || 3000;


// add interactions with app.post
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {


    // verification requests
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }


    // slash requests
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;

        if(name === 'sludge-test') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Hello you sludge animal`
                }
            })
        }
    }

    console.error(`unknown command: ${name}`)
    return res.status(400).json({error: "unknown interaction type"})
})


app.listen(PORT, () => {
    console.log("Listent on port: ", PORT)
})

