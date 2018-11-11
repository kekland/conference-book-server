import express from 'express'
import { log, error } from './logger'
import chalk from 'chalk';
import { ConferenceRouter } from './router/conferenceRoom.router'
import { UserRouter } from './router/user.router'
import bodyParser = require("body-parser");
import { IConferenceRoom } from "./model/conferenceRoom.model";
import lokijs from "lokijs";
import { IUser } from "./model/user.model";
import { OrderRouter } from './router/conferenceOrder.router';
const onClose = require("async-exit-hook");

const app: express.Application = express();
const db = new lokijs("db.json");
if (db.getCollection("conference") == null) {
  db.addCollection<IConferenceRoom>("conference");
}
if (db.getCollection("user") == null) {
  db.addCollection<IUser>("user");
}

const routers = {
  conference: new ConferenceRouter(db.getCollection("conference")),
  user: new UserRouter(db.getCollection("user")),
  order: new OrderRouter(db.getCollection('conference'), db.getCollection('user'))
};

app.use(bodyParser.json());
app.use("/conferences", routers.conference.getRouter());
app.use("/account", routers.user.getRouter());
app.use('/order', routers.order.getRouter());

app.listen(process.env.PORT, () => {
  log(`Listening on port ${chalk.blue("PORT")}`);
});

onClose((callback: () => void) => {
  log("Saving database");
  db.save(() => {
    log("Database saved");
    callback();
  });
});