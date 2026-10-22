create table if not exists tasks (
      id serial primary key,
      user_id integer references users(id) on  delete cascade,
      title varchar(200) not null,
      description text ,
      status varchar(20) CHECK (status IN ('pending', 'in_progress', 'completed')) default 'pending' not null,
      priority varchar(20) check (priority in('low','medium','high')) default 'medium' not null,
      due_date date ,
      created_at timestamp default CURRENT_TIMESTAMP,
      updated_at timestamp default CURRENT_TIMESTAMP
);