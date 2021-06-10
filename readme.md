Test Cookie
```
curl -X 'POST' \
  -c cookie.txt \
  'http://localhost/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "test",
  "password": "test"
}'
```

Access a protected endpoint
```
curl -X 'GET' \
  -b cookie.txt \
  'http://localhost/protected' \
  -H 'accept: application/json'
``