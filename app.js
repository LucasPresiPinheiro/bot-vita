const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");
const { body, validationResult } = require("express-validator");
const http = require("http");
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const puppeteer = require("puppeteer");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

(async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false, browser, page }, // Adicione a página aqui
  });

  client.initialize();

  // Resto do seu código de eventos do cliente WhatsApp...

  app.post(
    "/send-message",
    [body("number").notEmpty(), body("message").notEmpty()],
    async (req, res) => {
      // Resto do seu código para envio de mensagens...
    }
  );

  server.listen(port, function () {
    console.log("Aplicação bot-vita rodando na porta *: " + port);
  });
})();
