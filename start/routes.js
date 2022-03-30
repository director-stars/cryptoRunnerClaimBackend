'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
    Route.post("addList", "RefereesController.addList");
    Route.post("getTweetedReferee", "RefereesController.getTweetedReferee");
    Route.post("setRewardReferee", "RefereesController.setRewardReferee");
    Route.post("saveTwitterInfo", "RefereesController.saveTwitterInfo");
    Route.get("getTwitterInfo", "RefereesController.getTwitterInfo");
  }).prefix("api");