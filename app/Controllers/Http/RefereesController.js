'use strict'

const Referee = use("App/Models/Referee");

class RefereesController {
    async addList({ request }){
        try {
            const rList = request.input('list');
            for(let i = 0; i < rList.length; i ++){
                let referee = await Referee.findBy('address', rList[i]);
                if(referee){
                    await referee.save();
                }
                else{
                    referee = new Referee()
                    referee.address = rList[i];
                    await referee.save();
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getTweetedReferee() {
        let list = await Referee.query().where('isRewarded', false).andWhere('isTweeted', true).limit(50).orderBy('createdAt', 'asc');
        return list;
    }

    async setRewardReferee({request}) {
        try {
            const rList = request.input('list');
            for(let i = 0; i < rList.length; i ++){
                const referee = await Referee.query().where('address', rList[i].address).first();
                if(referee){
                    referee.isRewarded = true;
                    await referee.save();
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    }

    async saveTwitterInfo({request}) {
        let result;
        try{
            const account = request.input('account');
            const twitterName = request.input('twitterName');
            const referee = await Referee.query().where('address', account).first();
            const twitterReferee = await Referee.query().where('accountId', twitterName).whereNot('address', account).first();
            // console.log(referee);
            if(twitterReferee) {
                result = twitterName+" is already set on other address";
                return {result: result}
            }
            if(referee){
                referee.address = account;
                referee.accountId = twitterName;
                await referee.save();
            }
            result = "Succcess saved";
            return {result: result};
        } catch (error) {
            console.log(error)
            result = 'DB error';
            return {result: result};
        }
    }

    async getTwitterInfo({request}) {
        try{
            const account = request.input('account');
            const referee = await Referee.query().where('address', account).first();
            if(referee){
                if(referee.accountId){
                    return true;
                }
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = RefereesController