const config = require("../config/config");
const puppeteer = require("puppeteer");
const allDataController = async (req, res, next) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");
    let allData = await page.evaluate(() => {
      const titleList = document.body.querySelectorAll(".athing");
      let dataArray = [];
      titleList.forEach((titleElement) => {
        const parentTr = titleElement.closest("tr");
        const ageElement = parentTr.nextElementSibling.querySelector(".age");
        const utcTime = ageElement.title.trim();
        const ISTOffset = 330; // IST is UTC +5:30
        const ISTTime = new Date(utcTime);
        ISTTime.setMinutes(ISTTime.getMinutes() + ISTOffset); // Adjust for IST
        const time = ISTTime.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        const data = {
          id: titleElement.id,
          title: titleElement.querySelector(".titleline a").innerText,
          link: titleElement.querySelector(".titleline a").href,
          time: time,
        };
        dataArray.push(data);
      });
      return dataArray;
    });
    res.json({ allData });
    await browser.close();
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message,
    });
  }
};
module.exports = {
  allDataController,
};
