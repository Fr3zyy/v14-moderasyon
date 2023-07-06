const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Belirtilen kullanıcıyı sunucudan yasaklar.")
        .addUserOption(option => option.setName("kullanıcı").setDescription("Yasaklanacak kullanıcıyı seçin.").setRequired(true))
        .addStringOption(option => option.setName("sebep").setDescription("Yasaklama sebebini belirtin.").setRequired(true)),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({ content: "Kullanıcıları Banlama Yetkin Yok!", ephemeral: true })

        const bannedUser = interaction.options.getUser("kullanıcı");
        const reason = interaction.options.getString("sebep");

     await interaction.guild.members.ban(bannedUser, { reason: reason });

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Kullanıcı Yasaklandı")
            .setDescription(`${bannedUser.username}#${bannedUser.discriminator} kullanıcısı "${reason}" nedeniyle sunucudan yasaklandı.`);

        interaction.reply({ embeds: [embed] });
    },
};
