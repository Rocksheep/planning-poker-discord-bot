/* eslint-disable linebreak-style */
module.exports = {
  name: "storypoints",
  description: "story points command",
  execute(message, args) {
    const { games } = args;

    if (!games.has(message.channel.id)) {
      return message.channel.send("There is currently no game in progress. Start a game by using the !start command.");
    }

    const pokerGame = games.get(message.channel.id);
    if (!pokerGame.isQuestionRunning)
      return message.channel.send(
        "You are currently not answering a question."
      );

    const storypoints = parseInt(message.content.split(" ")[1]);

    if (!isNaN(storypoints)) {
      message.channel.send(
        `Added ${storypoints} to your question ${pokerGame.currentQuestion}`
      );

      pokerGame.finishQuestion(storypoints);
    } else {
      message.channel.send("The amount should be a valid number");
    }
  },
};
