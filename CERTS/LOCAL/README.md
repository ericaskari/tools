Create Root
Install on devices


    openssl genrsa -des3 -out certificate-authority.key 2048 
    openssl req -x509 -new -nodes -key certificate-authority.key -sha256 -days 1825 -out certificate-authority.pem


Update domain or Ip inside .ext file and  
Create for each server (ip or domain):
```bash

openssl genrsa -out ssl.key 2048

openssl req -new -key ssl.key -out certificate-signing-request.csr

openssl x509 \
-req \
-in certificate-signing-request.csr \
-CA ./EricLocalCompany-ca/certificate-authority.pem \
-CAkey ./EricLocalCompany-ca/certificate-authority.key \
-CAcreateserial \
-out ssl.crt \
-days 825 \
-sha256 \
-extfile configuration.ext

```

openssl req -x509 \
-nodes \
-days 365 \
-in certificate-signing-request.csr \
-out new-ssl.crt
