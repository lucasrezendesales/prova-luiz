# Pra comecar, py -m pip install selenium  & tambem py -m pip install webdriver_manager
#Apos isso arrumei o codigo para rodar


#Modulos de importacao e invokacao do webdriver
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time


# configura o webdriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.maximize_window()

try:
    # Acessa o endereco do professor
    url = "https://www.hankeds.com.br/prova/login.html"
    driver.get(url)

    # Delay do professor de 2 segundos para carregar 
    time.sleep(2)

    # Função para digitar texto lentamente (simulando usuário real)
    def digitar_lento(elemento, texto, delay=0.25):
        for letra in texto:
            elemento.send_keys(letra)
            time.sleep(delay)

    # Localiza elementos na pagina usando um find_element pelo id atribuido no html e o xpath do buton por nao TER ID (usuário, senha e botão entrar)
    usuario = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))
    senha = driver.find_element(By.ID, "password")
    botao = driver.find_element(By.XPATH, "//button[contains(text(), 'Entrar')]")

    # Digita o usuario e da um sleep de 1 segundo
    digitar_lento(usuario, "admin")
    time.sleep(1)

    # Digita a senha e da um sleep (dorme) 1 segundo
    digitar_lento(senha, "admin123456")
    time.sleep(1)

    # Clica no botão para fazer login
    botao.click()
    time.sleep(4)

    # Verifica se o redirecionamento foi feito corretamente
    if "destino.html" in driver.current_url:
        print("Teste passou: redirecionado corretamente.")
    else:
        print("Teste falhou: redirecionamento não ocorreu.")

    # Aguarda um pouco antes de fechar o navegador (para printar evidências)
    time.sleep(5)

except Exception as e:
    print("Erro durante o teste:", str(e))

finally:
    # Killa o chrome deive apos rodar o script
    driver.quit()