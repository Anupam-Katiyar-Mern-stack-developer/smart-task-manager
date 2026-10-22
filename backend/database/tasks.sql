create table if not exists tasks (
      id serial primary key,
      user_id integer references users(id) on cascade delete,
      title varchar(200) not null,
      description text ,
      status varchar(20) default 'pending',
      priority varchar(20) default 'medium',
      due_date date ,
      created_at timestamp default CURRENT_TIMESTAMP,
      updated_at timestamp default CURRENT_TIMESTAMP
);