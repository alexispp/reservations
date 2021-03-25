# reservations


https://hub.docker.com/_/postgres
docker run --name pl-database -e POSTGRES_PASSWORD=mysecretpassword -d -p 127.0.0.1:63859:5432/tcp postgres 

docker ps -a para ver el puerto


npx sequelize-cli model:generate --name Reservation --attributes name:string,time:string,createdAt:date
npx sequelize-cli model:generate --name User --attributes username:string,password:string,email:string