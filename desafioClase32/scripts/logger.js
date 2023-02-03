import winston from 'winston'

function buildLogger() {
  const Logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.Console({ level: 'info' }),
    ],
  })
  return Logger
}

let logger = buildLogger()

export default logger