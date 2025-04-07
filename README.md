## Sample function for Orcascan

Code sample for Node.js copied and adapted from [Orcascan docs](https://orcascan.com/guides/updating-your-system-data-when-a-barcode-is-scanned-da8bbe42)

Running locally without OpenFaaS:

Install `faas-cli` from the [GitHub releases page](https://github.com/openfaas/faas-cli/releases)

Or download with arkade:

```bash
curl -sLs https://get.arkade.dev | sudo sh
arkade get faas-cli
```

Then run the following command to start the function:

```bash
faas-cli local-run --watch
```

It'll listen on port 8080, so you can simple test it with curl:

```bash
curl --data-binary @./payload.json http://localhost:8080/ -H "Content-Type: application/json"
```

To deploy the function to OpenFaaS, make sure you edit the `image:` field to use your own container registry, then run `faas-cli up --gateway https://gateway.example.com`

