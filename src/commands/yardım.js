const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("yardım")
        .setDescription("Yardım menüsünü gösterir."),
    run: async (client, interaction) => {
        const Yardım = new EmbedBuilder()
            .setColor("Blurple")
            .setImage("https://media.discordapp.net/attachments/1004368050038001804/1086953067301310524/standard_1.gif")
            .setTitle("Fr3zy Youtube • Moderasyon Menüsü")
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
