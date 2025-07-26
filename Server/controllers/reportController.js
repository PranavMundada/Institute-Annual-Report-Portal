import ejs from 'ejs';
import path from 'path';
import puppeteer from 'puppeteer';
import Entry from '../models/entryModel.js';
import APIFeatures from '../utils/ApiFeatures.js';

export const generateAnnualReport = async (req, res) => {
  try {
    const features = new APIFeatures(
      Entry.find().populate('section').populate('type'),
      req.query
    )
      .filter()
      .sort();

    const entries = await features.query;
    console.log(entries, 'aa ');
    const year = new Date().getFullYear();

    const html = await ejs.renderFile(
      path.join(path.resolve(), 'views', 'reportTemplate.ejs'),
      {
        entries,
        year,
      }
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=annual_report.pdf',
    });

    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF');
  }
};
