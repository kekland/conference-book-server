import express from 'express'
import { log, error } from './logger'
import chalk from 'chalk';
import { ConferenceRouter } from './router/conferenceRoom.router'
import bodyParser = require('body-parser');
import { IConferenceRoom } from './model/conferenceRoom.model'
import lokijs from 'lokijs'

const app: express.Application = express()
const port = process.env.PORT || '8080'
const db = new lokijs('db.json')

if(db.getCollection('conference') == null) {
  db.addCollection<IConferenceRoom>('conference')
}

const routers = {
  conference: new ConferenceRouter(db.getCollection('conference'))
}

app.use(bodyParser.json())
app.use('/conferences', routers.conference.getRouter())

app.listen(port, () => {
  log(`Listening on port ${chalk.blue(port)}`)
})
