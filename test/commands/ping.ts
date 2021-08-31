import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { slashCommand, commandHandlerClient } from "../../dist/index.js";

export class command extends slashCommand {
  data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");
  async execute(interaction: CommandInteraction, client: commandHandlerClient) {
    await interaction.reply("pong!");
  }
}
