-- SQLite
create table if not exists contact_form (ID_ integer primary key, Name text not null, 
Email text not null unique, Message text not null, Created_Date text not null);