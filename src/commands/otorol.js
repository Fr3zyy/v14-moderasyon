const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("croxydb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("oto-rol")
        .setDescription("Yeni gelenlere otomatik rol verir..")
        .addRoleOption((option) =>
            option
                .setName("rol")
                .setDescription("Lütfen bir rol etiketle..")
                .setRequired(true)

        ),

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({ content: "Rolleri Yönet Yetkin Yok!", ephemeral: true })
        const rol = interaction.options.getRole('rol')
        db.set(`otorol_${interaction.guild.id}`, rol.id)
        const embed = new EmbedBuilder()
            .setDescription(`
            Yeni gelen üyelere <@&${rol.id}> rolü otomatik olarak verilecek.

            **NOT:** Eğerki botun rolü <@&${rol.id}> rolünden daha düşükse bot rolü veremez. botun rolünü üste alınız.
            `);
        interaction.reply({ embeds: [embed] })
    }

};