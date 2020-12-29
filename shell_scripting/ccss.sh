#! /bin/bash

env = $1

# global variables
tenantId="2cbbfd0a-0ff7-4062-89da-bf2fa63807b7"
garageId="239d8e65-a80b-4064-90f4-3501d182d65b"


_ccss_runsURL="aed08b450ef1c425783ed9abc9cca2a0-1021718144.us-east-1.elb.amazonaws.com:8080/api"


URL=${_ccss_runsURL}/v1/tenants/${tenantId}/garages/${garageId}/bus/getBusDetails


curl --location --request POST $URL \
--header 'Authorization: KhgHxin5W32b86AgHoGro8xSfTTg6uSo4rLAJDjK' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "GET_BUS_DETAILS-61d20455-4a68-466f-8101-de253b595108",
    "busVins": [
        "7JZTG11J0KL000024"
    ]
}'

echo 'Done..'
