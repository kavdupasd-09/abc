

const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config'); // Ensure your API key is in config

// Command to fetch movie details
cmd({
    pattern: "in",
    desc: "Fetch detailed information about a movie.",
    category: "download",
    react: "🎞️",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("! Movie not found.");
        }

        const movieInfo = `
*◆ 📄 ᴛɪᴛʟᴇ:* ${data.Title}
*◆ 🗓️ ʏᴇᴀʀ:* ${data.Year}
*◆ 🌟 ʀᴀᴛᴇᴅ:* ${data.Rated}
*◆ 🔥 ʀᴇʟᴇᴀꜱᴇᴅ:* ${data.Released}
*◆ ⏳ ʀᴜɴᴛɪᴍᴇ:* ${data.Runtime}
*◆ ✨ ɢᴇɴʀᴇ:* ${data.Genre}
*◆ 👤 ᴅɪʀᴇᴄᴛᴏʀ:* ${data.Director}
*◆ 🖊️ ᴡʀɪᴛᴇʀ:* ${data.Writer}
*◆ 👥 ᴀᴄᴛᴏʀꜱ:* ${data.Actors}
*◆ 🐼 ʟᴀɴɢᴜᴀɢᴇ:* ${data.Language}
*◆ 🌍 ᴄᴏᴜɴᴛʀʏ:* ${data.Country}
*◆ 🏅 ᴀᴡᴀʀᴅꜱ:* ${data.Awards}
*◆ 🌡️ ɪᴍᴅʙ ʀᴀᴛɪɴɢ:* ${data.imdbRating}


*⚘━━━━━━━╶╶╶╶━━━━━━━⚘*

 *🖊️ 𝐌𝐎𝐕𝐈𝐄 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐆𝐑𝐎𝐔𝐏 _~➙ https://chat.whatsapp.com/IkQ2yh3qDXG8fTyJdnSKSA~_*

*👀 𝐌𝐎𝐕𝐈𝐄 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 ~_➙ https://whatsapp.com/channel/0029Vb5xFPHGE56jTnm4ZD2k_~*

*👻 𝐌𝐎𝐕𝐈𝐄 𝐆𝐑𝐎𝐔𝐏 ~_➙ https://chat.whatsapp.com/K7UM5Jk6Igu0tnQMPhPRJj_~*

*👽 𝐓𝐕 𝐒𝐄𝐑𝐈𝐄𝐒 𝐆𝐑𝐎𝐔𝐏 ➙ ~_https://chat.whatsapp.com/EThzlx8sOrMKRDkXSHpSqG_~*

*🎠 𝐂𝐀𝐑𝐓𝐎𝐎𝐍 𝐱 𝐀𝐍𝐈𝐌𝐄 𝐆𝐑𝐎𝐔𝐏 ➙ _~https://chat.whatsapp.com/Bd2dcAsJ4zNL9LvmxccVmy~_*

*💬 𝐂𝐇𝐀𝐓 𝐆𝐑𝐎𝐔𝐏 ➙ ~https://chat.whatsapp.com/IU74OirJ5ZC0FMYzO0FkXs~*

*🧑‍💻 𝐁𝐎𝐓 𝐆𝐑𝐎𝐔𝐏 ➙ _~https://chat.whatsapp.com/ETnlbJGBTd13TvGhSUIFSq~_*

> *ᴘᴏᴡᴇʀᴅ ʙʏ  ᴋᴀᴠɪᴅᴜ ʀᴀꜱᴀɴɢᴀ : )*

*⚘━━━━━━━╶╶╶╶━━━━━━━⚘*`;

        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});
