create table  if not exists users(
    id serial not null primary key,
    name varchar(100) not null,
    email varchar(150) unique  not null,
    password_hash text not null,
    created_at timestamp default CURRENT_TIMESTAMP
)

