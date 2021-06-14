Test Cookie
```
curl -X 'POST' \
  -c cookie.txt \
  'http://localhost/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=username&password=password'
```

Access a protected endpoint (sending cookie)
```
curl -X 'GET' \
  -b cookie.txt \
  'http://localhost/api/test/auth/protected' \
  -H 'accept: application/json'
``


Refresh access token (sending cookie)
```
curl -X 'POST' \
  'http://localhost/api/auth/refresh' \
  -b cookie.txt \
  -H 'accept: application/json' \
  -H 'X-CSRF-TOKEN: e8b20355-21be-4410-939e-1a7251379cdf'\
  -d ''
```

Revoke access token
curl -X 'DELETE' \
  'http://localhost/api/auth/access-revoke' \
  -b cookie.txt \
  -H 'accept: application/json' \
  -H 'X-CSRF-TOKEN: c7127dbe-eb37-44f1-aae5-ab71da9a026c'\
  -d ''
```


References

https://github.com/tiangolo/fastapi/issues/1694
https://github.com/tiangolo/fastapi/issues/1742
https://towardsdatascience.com/fastapi-cloud-database-loading-with-python-1f531f1d438a
https://ahmed-nafies.medium.com/fastapi-with-sqlalchemy-postgresql-and-alembic-and-of-course-docker-f2b7411ee396


Send json values (not form)
```
curl -X 'POST' \
  -c cookie.txt \
  'http://localhost/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "test",
  "password": "test"
}'
  ```