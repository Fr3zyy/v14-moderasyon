const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Kanala yavaş mod ekler veya kaldırır.')
        .addIntegerOption(option =>
            option.setName('süre')
                .setDescription('Yavaş mod süresi (saniye cinsinden)')
                .setRequired(true)
        ),

    run: async (client,interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({ content: 'Kanalları Yönet yetkiniz yok!', ephemeral: true });
        }

        const channel = interaction.channel;
        const seconds = interaction.options.getInteger('süre');

        try {
            await channel.setRateLimitPerUser(seconds);
            interaction.reply(`Kanalın yavaş mod süresi başarıyla ${seconds} saniye olarak ayarlandı.`);
        } catch (error) {
            console.error(error);
            interaction.reply('Bir hata oluştu ve yavaş mod süresi ayarlanamadı.');
        }
    },
};
