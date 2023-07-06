const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("temizle")
        .setDescription("Belirtilen miktarda mesajı siler.")
        .addIntegerOption(option =>
            option
                .setName("miktar")
                .setDescription("Kaç mesaj silineceğini belirleyin (1-100 arası).")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName("kanal")
                .setDescription("Mesajların silineceği kanalı belirleyin.")
                .setRequired(false)
        ),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({ content: "Mesajları Yönet Yetkin Yok!", ephemeral: true })

        const miktar = interaction.options.getInteger("miktar");
        const kanal = interaction.options.getChannel("kanal") || interaction.channel;

        if (miktar < 1 || miktar > 100) {
            return interaction.reply("Hata: Silinecek mesaj miktarı 1 ile 100 arasında olmalıdır.");
        }

        try {
            const fetchedMessages = await kanal.messages.fetch({ limit: miktar });
            const messagesToDelete = fetchedMessages.filter(msg => !msg.pinned);

            await kanal.bulkDelete(messagesToDelete, true);

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Başarıyla ${messagesToDelete.size} mesaj silindi.`);

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply("Mesajları silerken bir hata oluştu.");
        }
    },
};
