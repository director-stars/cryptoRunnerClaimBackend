'use strict'

const Task = use('Task')
const { TwitterApi } = require('twitter-api-v2');
const Referee = use('App/Models/Referee')
const Env = use('Env');

class ScheduleIt extends Task {
  static get schedule () {
    return '*/10 * * * * *'
  }

  async handle () {
    const clientV2 = new TwitterApi(Env.get('TWITTER_BEARER_TOKEN'))
		// const today_date = new Date().toLocaleDateString();
		// const start_time = new Date(today_date).toISOString();
		// const minFriends = 2;
		let data;
		const result = await (Referee.query().where('is_tweeted', false).andWhere('is_rewarded', false).whereNotNull('account_id').whereNot('account_id', '')).fetch();
    const referees = result.toJSON()
		let user;
		//data = await clientV2.v2.search(`conversation_id:${tweetUrl}`, {"tweet.fields" : "author_id", "max_results" : "100"});
		await referees.forEach(async (referee) => {
			user = await clientV2.v2.userByUsername(referee.account_id);
			// data = await clientV2.v2.userTimeline(user.data.id, {start_time: start_time});
			data = await clientV2.v2.userTimeline(user.data.id, {exclude: ['retweets'], "tweet.fields" : "entities"});
			const result = await this.checkingTwitter(data);
			if(result){
				await Referee.query().where("account_id", referee.account_id).update({'is_tweeted': true});
			}
		})
  }

  async checkingTwitter(data) {
		for await (const tweetData of data) {
			if(tweetData.entities){
				if(tweetData.entities.urls){
					for (const url of tweetData.entities.urls) {
						if(url.expanded_url.includes('http://game.cryptorunner.io'))
							return true;
					}
				}
			}
		}
		return false;
	}
}

module.exports = ScheduleIt
