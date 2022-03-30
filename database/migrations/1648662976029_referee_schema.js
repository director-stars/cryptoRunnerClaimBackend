'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RefereeSchema extends Schema {
  up () {
    this.create('referees', (table) => {
      table.increments('id')
      table.string('account_id').unique()
      table.string('address')
      table.boolean('is_rewarded').defaultTo(false)
      table.boolean('is_tweeted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('referees')
  }
}

module.exports = RefereeSchema
