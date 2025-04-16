const { Builder, By } = require('selenium-webdriver');

(async function testeHanked() {
const url = 'https://www.hankeds.com.br/prova/login2.html';
let driver = await new Builder().forBrowser('chrome').build();

try {

await driver.get(url);
await driver.sleep(2000);

const username = await driver.findElement(By.id('username'));
const password = await driver.findElement(By.id('password'));
const botao = await driver.findElement(By.xpath("//button[contains(text(),'Entrar')]"));

for (const letra of 'admin') {
await username.sendKeys(letra);
await driver.sleep(250);
}

await driver.sleep(1000);

for (const letra of 'admin123456') {
await password.sendKeys(letra);
await driver.sleep(250);
}

await driver.sleep(1000);
await botao.click();

await driver.sleep(4000);

const urlAtual = await driver.getCurrentUrl();

if (urlAtual.includes('destino.html')) {
console.log(' Teste passou: redirecionado corretamente.');
} else {
console.log(' Teste falhou: não houve redirecionamento.');
}

await driver.sleep(5000);

} catch (err) {
console.error(' Erro durante o teste:', err);
} finally {
await driver.quit();
}
})();