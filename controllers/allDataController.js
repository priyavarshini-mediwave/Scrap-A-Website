const config = require("../config/config");
const puppeteer = require("puppeteer");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

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
    await addNewsToDatabase(allData);
    await browser.close();
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message,
    });
  }
};
const addNewsToDatabase = async (newsList) => {
  try {
    for (const newsItem of newsList) {
      const existingNews = await models.scrap.findOne({
        where: { scrap_id: newsItem.id },
      });

      if (!existingNews) {
        const addNews = await models.scrap.create({
          scrap_id: newsItem.id,
          title: newsItem.title,
          link: newsItem.link,
          time: newsItem.time,
        });
      } else {
        console.log("News already exists");
      }
    }
  } catch (error) {
    console.error("Error adding news to the database:", error);
    return res.json({
      message: error.message,
    });
  }
};
const searchController = async (req, res, next) => {
  let whereQuery = {};
  if (req.query.search) {
    searchTerm = req.query.search;
    whereQuery.title = {
      [Op.iLike]: `%${searchTerm}%`,
    };
  }
  try {
    const { count, rows: searchTitles } = await models.scrap.findAndCountAll({
      where: whereQuery,
    });
    res.json({
      count: count,
      SearchItems: searchTitles,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  allDataController,
  addNewsToDatabase,
  searchController,
};
