import Env from '@ioc:Adonis/Core/Env'
import { BaseTask } from 'adonis5-scheduler/build'
import { TwitterApi } from 'twitter-api-v2'
import Referee from 'App/Models/Referee'

export default class GetReferee extends BaseTask {
	public static get schedule() {
		return '*/10 * * * * *'
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {
		const clientV2 = new TwitterApi(Env.get('TWITTER_BEARER_TOKEN'))
		const today_date = new Date().toLocaleDateString();
		const start_time = new Date(today_date).toISOString();
		let data;
		const referees = await Referee.query().where('status', false);
		let user;
		await referees.forEach(async (referee) => {
			user = await clientV2.v2.userByUsername(referee.$attributes.accountId);
			// data = await clientV2.v2.userTimeline(user.data.id, {start_time: start_time});
			data = await clientV2.v2.userTimeline(user.data.id, {exclude: ['retweets']});
			for await (const tweetData of data) {
				let userlist = tweetData.text.match(/@\w+/g);
				console.log(userlist)
				let count = 0;
				let userInfo;
				if(userlist)
					if(userlist.length >= 3){
						for(let i=0; i< userlist.length; i ++){
							userInfo = await clientV2.v2.userByUsername(userlist[1].substr(1));
							if(userInfo.data != undefined){
								count ++;
							}
						}
						if(count >= 3){
							await Referee.query().where("accountId", referee.$attributes.account_id).update({'status': true});
						}
						console.log('-------------:> ', count);
					};
			}
		})
  	}
}