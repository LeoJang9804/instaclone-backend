#BACKEND SETTING

1. GIT REPOSITORY 만들고 연결
2. npm init -y
3. package.json dependencies 설치 (명령어: npm i 라이브러리@버전)
4. package.json devdependencies 설치 (명령어: npm i 라이브러리@버전 --save-dev)
5. postgresql 설치 (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (database)
6. npx prisma init
7. pgAdmin4에서 Servers/PostgreSQL14/Databases 우클릭 후 Create/Databases 클릭. 그 후 Database 이름 생성하고 저장
8. DATABASE_URL=f"postgresql://{username}:{password}@localhost:5432/{database name}?schema=public"으로 변경
9. npx prisma migrate dev (package.json script에 이 명령어 저장)

AWS
1. npm i aws-sdk
