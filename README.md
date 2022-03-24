# Node.js-Banking-application
type npm install from the terminal to download dependencies before running the file. 

Tests using postman:

1. signup a user/company
url: "/user/signup",
method: POST
json: {
"username": "",
"email": "",
"password": ""
}

if a company
url: user/signup/company
method: POST
json: {
"companyname": "",
"email": "",
"password": ""
}

2. user login
url: "/user/login"
method: POST
json: {
"email": "",
"password": ""
}

company login
url: "/user/login/company"
method: POST
json: {
"email": "",
"password": ""
}

3. user deposit an amount when a user is logged in
url: "/user/deposit"
method: POST
json: {
"email": "",
"amount": ""
}

4. user withdraw an amount when a user is logged in
Tmethod: POST
url: "/user/withdraw"
json: {
"email": "",
"amount": ""
}

// withdraw amount 0 validation taken care from the front-end
5. user get a deposit history when a user is logged in
method: GET 
url: "/user/deposit/history”


6. user get a withdraw history when a user is logged in
method: GET
url: "/user/withdraw/history"

7. user get a full transaction history when a user is logged in
method: GET
url: "/user/deposit_withdraw/history"


8. send some money to a user/person using their id
method: POST
url: "/user/money/transfer/user",
json: {
"recipientType": "", // value has to be user
"email": "", // money sender email
"amount": "",
"receiverID": "" // receiver(person) id
}

9. Pay a bill
method: POST
url: "/user/money/transfer/company",
json: {
"recipientType": "", // value has to be "company"
"email": "", // money sender email
"amount": "",
"receiverID": "" // receiver(company) id }

10. update a user profile when a user is logged in
method: POST
url: "/user/info/update",
json: {
"username": "updated value", // must contain an empty value
"email": "updated value", // must contain an empty value
"password": "updated value" // must contain an empty value
}

11. api test: show username and email if user has forotten it. user has to input their card number to get his info
Tmethod: POST
url: "/api/user/id/<8 digit bank unique card number>"
