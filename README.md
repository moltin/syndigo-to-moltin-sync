# Syndigo -> Moltin Sync

> A serverless function to receive a JSON dump of product data from Syndigo and update products in the Moltin API with this new data.

📚 [Moltin API reference](https://docs.moltin.com) &mdash; 📚 [Vendavo API reference](https://developers.endeavorcpq.com/v3/help/webserviceapi)

## 🛠 Pre-requisites

1. Serverless CLI

```bash
npm install -g serverless
```

2. Serverless [configured to use AWS Lambda](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

3. Moltin Account

## ⛽️ Usage

1. Change directory into the project and install the dependancies

```bash
cd syndigo-moltin
yarn
```

2. Rename `.example.env.yml`

```bash
cp .example.env.yml .example.yml 
```

3. Add values for your Moltin credentials in `.env.yml`
> **Note:** This requires a [Moltin](http://moltin.com) account.

4. Deploy the function via serverless

```bash
sls deploy
```

5. Note the deployed URL endpoint and add `/catalogue/update` to the end. The URL is where Syndigo should send its JSON for catalogue updates.

## ❤️ Contributing

We love community contributions. Here's a quick guide if you want to submit a pull request:

1.  Fork the repository
4.  Commit your changes
5.  Submit your PR with a brief description explaining your changes
