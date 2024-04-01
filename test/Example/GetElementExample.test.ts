import * as fs from 'fs';
import * as path from 'path';

import { expect } from 'chai';
import Handlebars from 'handlebars';
import * as util from 'node-inspect-extracted';
import puppeteer from 'puppeteer';

test('GetElementExample', async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  type ConsoleLogCall = {
    message: string;
    level: string;
    url: string;
    filename: string;
    line: number;
    column: number;
  };

  const consoleLogCalls: ConsoleLogCall[] = [];

  page.on('console', async (msg) => {
    // const allowedTypes : string[] = ['log', 'debug', 'info', 'error', 'warn'];
    // if (!(msg.type() in allowedTypes)) {
    //   return;
    // }
    const consoleLogCall: ConsoleLogCall = {
      message: msg.text(),
      level: msg.type(),
      url: msg.location().url ?? '',
      filename: path.basename(msg.location().url ?? ''),
      line: msg.location().lineNumber ?? 0,
      column: msg.location().columnNumber ?? 0,
    };
    const args = msg.args();
    if (args.length === 0) {
      console.log('args length equal zero');
      return;
    }
    const firstArg = args[0];

    const firstArgRemoteObject = firstArg.remoteObject();
    if (firstArgRemoteObject.type === 'object') {
      consoleLogCall.message = await page.evaluate((obj) => {
        return util.inspect(obj, {
          compact: false,
          stylize: util.stylizeWithHTML,
          depth: 5,
        } as util.InspectOptions);
      }, firstArg);
      // const data = JSON.parse(await page.evaluate((obj) => JSON.stringify(obj), firstArg));
      // consoleLogCall.message = util.inspect(data, {
      //   compact: false,
      //   stylize: util.stylizeWithHTML,
      //   depth: 5
      // } as util.InspectOptions);
    }

    consoleLogCalls.push(consoleLogCall);

    // let args = msg.args();
    //
    // let newArgs: String[] = [];
    // for (const arg of args) {
    //   const index = args.indexOf(arg);
    //   const remoteObject = arg.remoteObject();
    //   let originalObject: null|unknown = null;
    //   if (remoteObject.type === 'object') {
    //     originalObject = JSON.parse(await page.evaluate((obj) => JSON.stringify(obj), arg));
    //   }
    //   newArgs[index] = util.inspect(originalObject, {
    //     compact: false,
    //     stylize: util.stylizeWithHTML,
    //     depth: 10
    //   } as util.InspectOptions);
    // }
    //
    // consoleLogRows.push({
    //   message: msg.text(),
    //   args: newArgs,
    //   location: {
    //     url: msg.location().url,
    //     lineNumber: msg.location().lineNumber,
    //     columnNumber: msg.location().columnNumber
    //   }
    // });
  });

  await page.goto('http://ember-nexus-frontend-example:80/docs/browser-events/element/get-element/index.html');
  await page.waitForSelector('#finished');
  // await new Promise(resolve => setTimeout(resolve, 3000));

  const consoleTemplate = fs.readFileSync(path.resolve(__dirname, './console.template.html')).toString();
  // console.log(consoleTemplate);

  // console.log(Mustache);
  // console.log(consoleTemplate);

  const template = Handlebars.compile(consoleTemplate);
  const consoleHtml = template({
    rows: consoleLogCalls,
  });

  // let consoleLog = consoleLogEntries
  //   .join("\n")
  //   .replace('\t', "\t")
  //   .replace('\n', "\n");

  // console.log(consoleHtml);

  fs.writeFileSync(path.resolve(__dirname, './console.html'), consoleHtml);

  await browser.close();

  // const pathToHtmlTemplateFile = 'template.html';
  // const pathToHtmlFile = '../../docs/browser-events/element/get-element/index.html';
  // const pathToScriptFile = '../../docs/browser-events/element/get-element/script.js';
  //
  // const htmlTemplateContent = fs.readFileSync(path.resolve(__dirname, pathToHtmlTemplateFile)).toString();
  // const htmlContent = fs.readFileSync(path.resolve(__dirname, pathToHtmlFile)).toString();
  // const scriptContent = fs.readFileSync(path.resolve(__dirname, pathToScriptFile)).toString();
  //
  // const combinedHtmlContent = htmlTemplateContent
  //   .replace("###EXAMPLE_HTML_CONTENT###", htmlContent)
  //   .replace("//###EXAMPLE_JS_CONTENT###", scriptContent);
  //
  // console.log(combinedHtmlContent);
  //
  // const virtualConsole = new VirtualConsole();
  // virtualConsole.sendTo(console);
  //
  // new JSDOM(combinedHtmlContent, { runScripts: "dangerously", virtualConsole });

  expect(true).to.be.true;
});
