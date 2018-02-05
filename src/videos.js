const mongoose = require('mongoose')
const notifiers = require('./notifiers')
const config = require('nconf')
const puppeteer = require('puppeteer')
const filters = config.get('filters')
const Video = mongoose.model('Video')

async function checkAndAddVideo(video) {
  if (filters.includes(video.title)) {
    const exists = await videoExists(video)
    if (!exists) {
      await addVideo(video)
      await notifiers.notify(video)
    }
  }
}

async function addVideo(video) {
  const newVideo = await new Video({ title: video.title, season: video.season, episode: video.episode, publisher: video.publisher })
  await newVideo.save()
}

async function videoExists(video) {
  const v = await Video.findOne({ title: video.title, season: video.season, episode: video.episode, publisher: video.publisher })
  return v !== null
}

async function fetchVideoData() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await console.log("fetching videos...")
  await page.goto('http://hdrezka.ag/')
  await console.log("processing data...")
  const blocks = await page.$$(".b-seriesupdate__block_list_item_inner")
  const videos = await Promise.all(blocks.map(block => mapBlock(block, page)))
  await console.log("checking videos...")
  await checkAllVideos(videos)
  await console.log("finished")
  await browser.close()
}

async function checkAllVideos(videos) {
  await Promise.all(videos.map(async (video) => await checkAndAddVideo(video)))
}

async function mapBlock(block, page) {
  const titleElement = await block.$(".cell-1 > a")
  const title = await page.evaluate(el => el.innerHTML, titleElement)
  const seasonElement = await block.$(".season")
  var seasonText = await page.evaluate(el => el.innerHTML, seasonElement)
  const episodeElement = await block.$(".cell-2")
  var episodeText = await page.evaluate(el => el.firstChild.nodeValue, episodeElement)
  const publisherElement = await block.$(".cell-2 > i")
  var publisher = publisherElement == null ? "()" : await page.evaluate(el => el.innerHTML, publisherElement)
  seasonText = seasonText.replace('(', '').replace(' сезон)', '')
  episodeText = episodeText.replace(' серия ', '')
  publisher = publisher.replace('(', '').replace(')', '')
  const season = Number.parseInt(seasonText)
  const episode = Number.parseInt(episodeText)
  return { title, season, episode, publisher }
}

module.exports = {
  fetchVideoData
}
