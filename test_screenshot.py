import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        await page.goto('http://localhost:3000')

        # Scroll down to trigger framer-motion whileInView animations
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(2000) # Wait for animations

        # Scroll back up a bit
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(500)

        await page.screenshot(path='/home/jules/verification/landing_page_scrolled.png', full_page=True)
        await browser.close()

asyncio.run(main())
