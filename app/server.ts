import express from 'express'
import {log, error} from './logger'
import chalk from 'chalk';

const app: express.Application = express()
const port = process.env.PORT || '8080'

app.listen(port, () => {
  log(`Listening on port ${chalk.blue(port)}`)
})