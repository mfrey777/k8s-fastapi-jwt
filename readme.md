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


References

https://github.com/tiangolo/fastapi/issues/1694
https://github.com/tiangolo/fastapi/issues/1742
https://towardsdatascience.com/fastapi-cloud-database-loading-with-python-1f531f1d438a
https://ahmed-nafies.medium.com/fastapi-with-sqlalchemy-postgresql-and-alembic-and-of-course-docker-f2b7411ee396