const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kilit')
        .setDescription('Kanala üyelerin mesaj yazmasını kilitler veya kilidini açar.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('kilitle')
                .setDescription('Kanalı kilitleyerek üyelerin mesaj yazmasını kısıtlar.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('kaldır')
                .setDescription('Kilidi kaldırarak kanala mesaj yazılmasına izin verir.')
        ),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: "Kanalları Yönet Yetkin Yok!", ephemeral: true })

        const getSubcommand = interaction.options.getSubcommand();

        if (getSubcommand === 'kilitle') {
            const channel = interaction.channel;
            const guild = interaction.guild;
            const member = interaction.member;

            if (!channel.permissionsFor(guild.id).has(PermissionFlagsBits.SendMessages)) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setTitle(`#${channel.name} Kanalı Zaten Kilitli!`)
                            .setDescription('Kilidi kaldırmak için `/kilit kaldır` komutunu kullanabilirsin.')
                    ]
                });
            }

            try {
                await channel.permissionOverwrites.edit(guild.id, {
                    SendMessages: false
                });

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Green')
                            .setTitle(`#${channel.name} Kanalı Başarıyla Kilitlendi!`)
                            .setDescription('Kilidi kaldırmak için `/kilit kaldır` komutunu kullanabilirsin.')
                    ]
                });
            } catch (error) {
                console.error(error);
                return interaction.reply({
                    content: 'Kanal kilitleme işlemi sırasında bir hata oluştu.',
                    ephemeral: true
                });
            }
        } else if (getSubcommand === 'kaldır') {
            const channel = interaction.channel;
            const guild = interaction.guild;
            const member = interaction.member;

            if (channel.permissionsFor(guild.id).has(PermissionFlagsBits.SendMessages)) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setTitle(`#${channel.name} Kanalı Zaten Kilitli Değil!`)
                            .setDescription('Kilitlemek için `/kilit kilitle` komutunu kullanabilirsin.')
                    ]
                });
            }

            try {
                await channel.permissionOverwrites.edit(guild.id, {
                    SendMessages: true
                });

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Green')
                            .setTitle(`#${channel.name} Kanalının Kilidi Başarıyla Kaldırıldı!`)
                            .setDescription('Herhangi bir sorun yaşarsan destek alabilirsin.')
                    ]
                });
            } catch (error) {
                console.error(error);
                return interaction.reply({
                    content: 'Kanal kilidini kaldırma işlemi sırasında bir hata oluştu.',
                    ephemeral: true
                });
            }
        }
    }
};
