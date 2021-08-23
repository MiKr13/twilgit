const { Octokit } = require("@octokit/core");

export default class GithubService {
	#githubPersonalToken = process.env.APP_GITHUB_PERSONAL_TOKEN;

	constructor() {
		this.oktokit = new Octokit({
			auth: this.#githubPersonalToken,
		});
	}

	async getRepoList() {
		try {
			const { data } = await this.oktokit.request("/user/repos");
			return data;
		} catch (error) {
			throw new Error(error.toString());
		}
	}
}
