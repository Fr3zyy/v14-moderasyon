const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("yardım")
        .setDescription("Yardım menüsünü gösterir."),
    run: async (client, interaction) => {
        const Yardım = new EmbedBuilder()
            .setColor("Blurple")
            .setImage("https://cdn.discordapp.com/attachments/1132009703891800226/1193928850615304263/Adsz_tasarm_2.gif?ex=65ae7fe4&is=659c0ae4&hm=3019fdfdd0c5c96a6fdd3360a24730bc8701109e41f4a1f9469520125496f0d6&")
            .setTitle("Tween • Yardım Menüsü")
            .setDescription(`                
                **/ban** • Belirtilen kişiyi sunucudan banlar.
                **/kick** • Belirtilen kişiyi sunucudan atar.
                **/unban** • Belirtilen idli kişinin banını açar.
                **/kilit kilitle** • Kanalı kilitler.
                **/kilit kaldır** • Eğerki kanal kilitliyse o kiliti kaldırır.
                **/oto-rol** • Sunucuya gelen üyelere otomatik rol verir.
                **/reklam-engel** • Reklam engel sistemini açar.
                **/slowmode** • Kanala yavaş mod ekler.
                **/temizle** • Belirtilen miktarda mesaj siler.

            `);

        interaction.reply({ embeds: [Yardım] });
    },
};
