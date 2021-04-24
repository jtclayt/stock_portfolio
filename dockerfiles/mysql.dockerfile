FROM mysql:8

COPY scripts/modify_user.sql /docker-entrypoint-initdb.d/
