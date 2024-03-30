import { expect } from 'chai';
import puppeteer from 'puppeteer';
import * as fs from "fs";

test('GetElementExample', async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  let consoleLogEntries: string[] = [];

  page.on('console', (msg) => {
    let line = `${msg.text()}`;
    consoleLogEntries.push(line);
  });

  await page.goto('http://ember-nexus-frontend-example:80/docs/browser-events/element/get-element/index.html');
  await page.waitForSelector('#finished');

  let consoleLog = consoleLogEntries
    .join("\n")
    .replace('\t', "\t")
    .replace('\n', "\n");

  console.log(consoleLog);

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
