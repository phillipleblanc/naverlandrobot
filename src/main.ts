import puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://new.land.naver.com/complexes/12240?ms=37.539953,126.945308,17&a=APT:ABYG:JGC&e=RETAIL&articleNo=2132027944');
  await page.screenshot({ path: 'naver_test.png' });

  await browser.close();
})();