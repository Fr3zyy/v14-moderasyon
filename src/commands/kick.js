const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Belirtilen kullanıcıyı sunucudan atar.")
        .addUserOption(option => option.setName("kullanıcı").setDescription("Atılacak kullanıcıyı seçin.").setRequired(true))
        .addStringOption(option => option.setName("sebep").setDescription("Atılma sebebini belirtin.").setRequired(true)),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({ content: "Kullanıcıları At Yetkin Yok!", ephemeral: true })

        const kickedUser = interaction.options.getUser("kullanıcı");
        const reason = interaction.options.getString("sebep");

        await interaction.guild.members.kick(kickedUser, reason);

        const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("Kullanıcı Atıldı")
            .setDescription(`${kickedUser.username}#${kickedUser.discriminator} kullanıcısı "${reason}" nedeniyle sunucudan atıldı.`);

        interaction.reply({ embeds: [embed] });
    },
};
