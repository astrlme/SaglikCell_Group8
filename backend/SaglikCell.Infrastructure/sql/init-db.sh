#!/bin/bash
set -e

echo "Running schema scripts..."
for f in /sql/schema/*.sql; do
    echo "Executing $f"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$f"
done

echo "Running seed scripts..."
for f in /sql/seed/*.sql; do
    echo "Executing $f"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$f"
done
