import express from 'express'
import {log, error} from './logger'
import chalk from 'chalk';
import { conferenceRouter } from './router/conferenceRoom.router'
const app: express.Application = express()
const port = process.env.PORT || '8080'

app.use('/conferences', conferenceRouter)

app.listen(port, () => {
  log(`Listening on port ${chalk.blue(port)}`)
})