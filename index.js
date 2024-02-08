const puppeteer = require("puppeteer");
// starting Puppeteer
puppeteer
  .launch()
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");
    //Wait for the page to be loaded
    await page.waitForSelector(".titleline a");
    // let heading = await page.evaluate(() => {
    //   const h1 = document.body.querySelector("h1")
    //   return h1.innerText
    // })
    // console.log({ heading })
    let allTitles = await page.evaluate(() => {
      const TitleList = document.body.querySelectorAll(".titleline a");
      let titles = [];
      TitleList.forEach((value) => {
        titles.push(value.innerText);
      });
      return titles;
    });
    console.log({ allTitles });

    let allDate = await page.evaluate(() => {
      const DateList = document.body.querySelectorAll(".score span");
      let dates = [];
      DateList.forEach((value) => {
        dates.push(value.innerText);
      });
      return dates;
    });
    console.log({ allDate });
    // closing the browser
    await browser.close();
  })
  .catch(function (err) {
    console.error(err);
  });
