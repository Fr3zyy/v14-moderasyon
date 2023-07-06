const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Belirtilen kullanıcının yasağını kaldırır.")
        .addStringOption(option => option.setName("kullanıcı").setDescription("Kullanıcının ID'sini girin.").setRequired(true)),
    run: async (client, interaction) => {
        const bannedUserId = interaction.options.getString("kullanıcı");

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.reply("Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.");
        }

        try {
            const guild = interaction.guild;
            const bans = await guild.bans.fetch();
            const bannedUser = bans.find(ban => ban.user.id === bannedUserId);

            if (!bannedUser) {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("Belirtilen kullanıcının yasağı bulunamadı.");

                return interaction.reply({ embeds: [embed] });
            }
            const reason = bannedUser.reason || "Neden belirtilmemiş.";

            await guild.bans.remove(bannedUser.user);

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Kullanıcının yasağı kaldırıldı: ${bannedUser.user.tag}\nNeden: ${reason}`);

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply("Yasağı kaldırırken bir hata oluştu.");
        }
    },
};
