from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--headless")  # Executa o Chrome em modo headless (sem interface gráfica)
chrome_options.add_argument("--disable-gpu")  # Desativa a aceleração por hardware para evitar problemas de renderização

# Caminho para o arquivo do driver do Chrome
chrome_driver_path = "caminho/para/chromedriver"

# Cria uma instância do WebDriver do Chrome
driver = webdriver.Chrome(executable_path=chrome_driver_path, options=chrome_options)

# Maximiza a janela para preencher a tela (opcional)
driver.maximize_window()

# Define a opacidade da janela do navegador (0 = completamente transparente, 1 = opaco)
driver.execute_cdp_cmd("Emulation.setDefaultBackgroundColorOverride", {"color": {"r": 0, "g": 0, "b": 0, "a": 0}})

# Abre uma página web no navegador
driver.get("https://www.example.com")

