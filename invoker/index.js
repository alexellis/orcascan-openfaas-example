'use strict'

const axios = require('axios')

const fsPromises = require('fs').promises

async function run() {
    let data = await fsPromises.readFile("../payload.json", 'utf8')
    let payload = JSON.parse(data)

    let url = "https://gateway.sandbox.openfaas.com/function/fn1"

    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    let emails = ["test@openfaas.com", "john@orcascan.com", "admin@example.com"]
    for (let i = 0; i < emails.length; i++) {
        payload["___orca_user_email"] = emails[i]

        console.log(`Event from Orcascan for email: ${emails[i]}`)
        let start = new Date()
        try {
            let response = await axios.post(url, payload, { headers: headers })
            let duration = new Date() - start
            console.log(`${response.status} (${duration}ms) - ${JSON.stringify(response.data)}\n`)
        } catch (e) {
            // If the error has a response property, it's an HTTP error
            if (e.response) {
                let duration = new Date() - start
                console.log(`${e.response.status} (${duration}ms) - ${JSON.stringify(e.response.data)}\n`)
            } else {
                // For network errors or other issues
                console.error(`Error: ${e.message}`)
            }
        }
    }
}


run().catch( (err) => {
  console.error('Error:', err)
  process.exit(1)
})