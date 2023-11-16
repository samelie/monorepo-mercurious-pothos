#!/usr/bin/env bash

# This script is here in order to show how the certs were created.

# Should be exececuted from this directory: ./create-new-cert.sh

openssl req -newkey rsa:4096 -nodes -keyout key.pem -x509 -days 7300 -out certificate.pem -extensions req_ext -config ssl.conf -subj '/CN=Pessl Apps/O=Pessl/C=US/L=Oakland/OU=Web Apps'
# remove the old keys
rm proxy.cer && rm proxy.key
# rename the ones just created
mv certificate.pem proxy.cer
mv key.pem proxy.key
