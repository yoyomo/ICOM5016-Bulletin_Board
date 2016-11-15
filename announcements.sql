with announcements as 
		((select category,postID,uID,title,description, attachment, dateAdded
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
		order by dateAdded;