
# Desafio Will Bank

A solução encontrada é exemplificada no seguinte fluxo abaixo:

![App Screenshot](./screenshots/arch.png)

## Elementos

- Api Billet:
    - Desenvolvida em NodeJs + express, responsável por receber as requisições POST /billet para executar um pagamento de boleto e também GET /billet/{uuid} para recuperar informações sobre um boleto 
- Cluster kafka:
    - Container docker usado como cluster para conter os brokers que receberam as mensagens dos producers e posteriormente guardadas em disco.
- Payment-provider:
    - Container docker rodando uma imagem nodeJs que contem o consumer, resposável por receber as mensagens publicadas no tópico billet e fazer as requisições para o serviço que realiza o pagamento de boleto.
- Payment-service:
    - Mock responsável por simular a resposta do pagamento de um boleto.
- BILLET-DB
    - Banco de dados responsável por armazenar as informações referentes ao pagamento dos boletos.