import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Referee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public accountId: string

  @column()
  public address: string

  @column()
  public isRewarded: boolean

  @column()
  public isTweeted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
