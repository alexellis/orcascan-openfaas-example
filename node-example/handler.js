'use strict'

module.exports = async (event, context) => {
    console.log("Request received: \n"+JSON.stringify(event.body, null, 2));
    let data = event.body

    // get the name of the action that triggered this request (add, update, delete, test)
    const action = data.___orca_action

    // get the name of the sheet this action impacts
    const sheetName = data.___orca_sheet_name

    // get the email of the user who preformed the action (empty if not HTTPS)
    const userEmail = data.___orca_user_email

    // orca system fields start with ___
    // access the value of fields using the field name
    // example: data.Name, data.Barcode, data.Location

    switch (action) {
        case "add":
            // TODO: do something when a row has been added

            if(userEmail.indexOf("@openfaas.com") >-1) {
                return context
                  .status(400)
                  .succeed(`Bad request, ${userEmail} is not allowed to add barcodes to ${sheetName}`)
            }
            break;
        case "update":
            // TODO: do something when a row has been updated
            break;
        case "delete":
            // TODO: do something when a row has been deleted
            break;
        case "test":
            // TODO: do something when the user in the web app hits the test button
            break;
      }

  if(action && sheetName && userEmail) {
    let rowCount = 0
    if(data.rows) {
      rowCount = data.rows.length
    }

    console.log(`Accepted ${action} for ${sheetName} - ${rowCount} rows`)

    return context
      .status(201)
      .succeed({"message":`Accepted ${action} for ${sheetName} - ${rowCount}`})
  }

  return context
    .status(400)
    .headers({"Content-Type": "text/plain"})
    .fail("Invalid Orcascan webhook")
}