const { sendSMS } = require("../../services/twilio");

const githubHook = async (req, res) => {
  try {
    let message = "";
    const repo = req.body.repository.full_name;
    if (Object.keys(req.body).includes("issue")) {
      const number = req.body.issue.number;
      if (req.body.action === "opened") {
        const user = req.body.issue.user.login;
        message = `New Issue on ${repo} repository - #${number} opened by @${user}`;
      } else if (req.body.action === "created") {
        const user = req.body.comment.user.login;
        message = `New Comment on ${repo} repository's issue number - #${number} created by @${user}`;
      } else if (req.body.action === "closed") {
        const user = req.body.sender.login;
        message = `Issue - #${number} on ${repo} repository closed by @${user}`;
      }
    } else if (Object.keys(req.body).includes("pull_request")) {
      const number = req.body.pull_request.number;
      if (req.body.action === "opened") {
        const user = req.body.pull_request.user.login;
        message = `New Pull Request on ${repo} repository - #${number} opened by @${user}`;
      } else if (req.body.action === "created") {
        const user = req.body.comment.user.login;
        message = `New Comment on ${repo} repository's Pull Request - #${number} created by @${user}`;
      } else if (req.body.action === "closed") {
        const user = req.body.sender.login;
        message = `Pull Request - #${number} on ${repo} repository closed by @${user}`;
      }
    }

    const response = await sendSMS(
      process.env.APP_TWILIO_PERSONAL_NUMBER,
      message
    );
    res.send(response.status || "OK");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  githubHook,
};
