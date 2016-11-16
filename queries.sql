drop table Other;
drop table mentorship;
drop table announcement;
drop table admin;
drop table member;

create table Member(
uID bigserial primary key not null,
username varchar(16) unique not null,
password varchar(20) not null,
email varchar(50) unique not null,
profPic bytea,
typeOfAccount varchar(16) default 'Regular',
activePosts int default 0
check ( (activePosts <= 3 and typeOfAccount = 'Regular')
or (typeOfAccount = 'Premium')),
phoneNumber text[]
);


create table Admin (
uID bigserial primary key references Member(uID) not null,
securityKey varchar(16) not null,
firstName text not null,
lastName text not null
) ;

/*create table Announcement(
category char(1) not null,
postID bigserial  not null,
uID bigserial references Member(uID) not null,
title varchar(20) not null,
description text,
dateAdded timestamp default current_timestamp not null,
attachment bytea,
primary key(category,postID)
) ;
*/

create table Book(
category char(1) default 'b' not null,
postID bigserial  not null,
uID bigserial references Member(uID) not null,
title varchar(20) not null,
description text,
dateAdded timestamp default current_timestamp not null,
attachment bytea,

name text not null,
author text not null,
edition varchar(10),
year int,
price numeric(9,2) default 0.00,

primary key(category,postID)
) ;

create table Mentorship(
category char(1) default 'm' not null,
postID bigserial  not null,
uID bigserial references Member(uID) not null,
title varchar(20) not null,
description text,
dateAdded timestamp default current_timestamp not null,
attachment bytea,

subject varchar(20) not null,
fee numeric(9,2) default 0.00,
primary key(category,postID)
) ;

create table Event(
category char(1) default 'e' not null,
postID bigserial  not null,
uID bigserial references Member(uID) not null,
title varchar(20) not null,
description text,
dateAdded timestamp default current_timestamp not null,
attachment bytea,

dateOfEvent timestamp,
location text,
fee numeric(9,2) default 0.00,
primary key(category,postID)
) ;

create table Housing(
category char(1) default 'h' not null,
postID bigserial  not null,
uID bigserial references Member(uID) not null,
title varchar(20) not null,
description text,
dateAdded timestamp default current_timestamp not null,
attachment bytea,

address text,
monthlyPrice numeric(9,2) default 0.00,
primary key(category,postID)
) ;

create table Other(
category char(1) default 'o' not null,
postID bigserial  not null,
uID bigserial references Member(uID) not null,
title varchar(20) not null,
description text,
dateAdded timestamp default current_timestamp not null,
attachment bytea,

itemName text not null,
primary key(category,postID)
) ;

create table Admod(
category char(1) default 'a' not null,
postID bigserial  not null,
uID bigserial references Member(uID) not null,
title varchar(20) not null,
description text,
dateAdded timestamp default current_timestamp not null,
attachment bytea,

typeOfMod text check(typeOfMod in('Error','Warning',
'Attention','Announcement','Modification','Update')),
typeOfUsers text check(typeOfUsers in ('Regular','Premium',
'All')),
primary key(category,postID)
) ;

create table Message(
mID bigserial not null check(mID > 0),
senderID bigserial references member(uID) not null,
receiverID bigserial references member(uID) not null,
messageText text not null, 
seen text not null default 'Not Seen'
check (seen in ('Not Seen','Seen')),
dateSent timestamp default current_timestamp not null,
primary key(mID,senderID,receiverID)
);

create table Payment(
pID bigserial not null,
buyerID bigserial references member(uID) not null,
sellerID bigserial references member(uID) not null,
category char(1) not null,
postID bigserial not null,
amount numeric(9,2) not null,
typeOfPayment text 
check (typeOfPayment in ('Paypal','MasterCard','Visa',
'Discover','American Express')) not null,
dateOfPayment timestamp default current_timestamp not null,

primary key(pID, buyerID, sellerID)
);

create table Report(
category char(1) default 'o' not null,
postID bigint not null,
uID bigserial references member(uID) not null,
typeOfReport text 
check(typeOfReport in ('Inappropriate','Spam',
'Offensive','Scam','Other')),
comment text not null,
primary key (uID,postID,category)
);

-- QUERIES

--ALL ANNOUNCEMENTS
with announcements as ((select category,postID,uID,title,description, attachment, dateAdded
from event )
union 
(select category,postID,uID,title,description, attachment, dateAdded
from book)
union
(select category,postID,uID,title,description, attachment, dateAdded
from housing)
union
(select category,postID,uID,title,description, attachment, dateAdded
from mentorship)
union
(select category,postID,uID,title,description, attachment, dateAdded
from other))
select *
from announcements
order by dateAdded desc

--
select *
from message
where (senderID=1 and receiverid=4)
or (senderid=4 and receiverid=4)
order by datesent
