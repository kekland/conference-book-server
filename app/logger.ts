import chalk from 'chalk'
import moment from 'moment'

export function log(...message: string[]) {
  const time = moment.utc(moment.now()).toLocaleString()
  let spacing = ''
  for (let i = 0; i < time.length + 2; i++) {
    spacing += ' '
  }
  message.forEach((msg, i) => {
    if (i === 0) {
      console.log(`${chalk.gray(time)}: ${msg}`)
    } else {
      console.log(`${spacing}${msg}`)
    }
  })
}

export function error(message: string) {
  console.log(`${chalk.bgRed(moment.now().toString())}: ${message}`)
}
