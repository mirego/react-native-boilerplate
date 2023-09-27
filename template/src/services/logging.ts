import { singleton } from 'tsyringe';

@singleton()
export default class Logging {
  log(...messages: any[]) {
    console.log(...messages);
  }

  info(...messages: any[]) {
    console.info(...messages);
  }

  error(...messages: any[]) {
    console.error(...messages);
  }
}
