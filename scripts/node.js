// Importa ferramentas do Selenium: Builder cria o navegador, By encontra elementos na página
const { Builder, By } = require('selenium-webdriver');

// Função principal do teste
(async function testeHanked() {
  const url = 'https://www.hankeds.com.br/prova/login2.html';

  // Inicia o navegador Chrome
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Acessa a página
    await driver.get(url);
    await driver.sleep(2000); // Espera carregar

    // Pega os campos de login e o botão "Entrar"
    const username = await driver.findElement(By.id('username'));
    const password = await driver.findElement(By.id('password'));
    const botao = await driver.findElement(By.xpath("//button[contains(text(),'Entrar')]"));

    // Digita "admin" lentamente no usuário
    for (const letra of 'admin') {
      await username.sendKeys(letra);
      await driver.sleep(250);
    }

    await driver.sleep(1000); // Pausa

    // Digita "admin123456" na senha
    for (const letra of 'admin123456') {
      await password.sendKeys(letra);
      await driver.sleep(250);
    }

    await driver.sleep(1000); // Pausa

    // Clica no botão
    await botao.click();
    await driver.sleep(4000); // Espera o redirecionamento

    // Verifica se foi redirecionado corretamente
    const urlAtual = await driver.getCurrentUrl();
    if (urlAtual.includes('destino.html')) {
      console.log('✅ Teste passou: redirecionado corretamente.');
    } else {
      console.log('❌ Teste falhou: não houve redirecionamento.');
    }

    await driver.sleep(5000); // Tempo extra para visualizar

  } catch (err) {
    // Mostra erro, se acontecer
    console.error('❌ Erro durante o teste:', err);
  } finally {
    // Fecha o navegador
    await driver.quit();
  }
})();
