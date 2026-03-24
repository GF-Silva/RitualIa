from playwright.sync_api import sync_playwright

def start_browser(url):
    playwright = sync_playwright().start()
    browser = playwright.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto(url)
    page.wait_for_timeout(3000)
    return playwright, browser, page

def stop_browser(playwright, browser):
    browser.close()
    playwright.stop()

if __name__ == '__main__':
    url = "https://www.youtube.com/watch?v=iywaBOMvYLI&list=RDiywaBOMvYLI&start_radio=1"
    
    playwright, browser, page = start_browser(url)
    
    # navegador fica aberto, você controla aqui:
    input("Pressione Enter para fechar...")
    
    stop_browser(playwright, browser)