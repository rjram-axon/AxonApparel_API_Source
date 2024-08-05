CREATE TABLE [dbo].[MenuList]
(
	MenuId INT IDENTITY(1,1) NOT NULL,
	MenuName varchar(50) NOT NULL,
	ParentId int,
	Remarks varchar(100) NULL,
	Url varchar(100) NULL,

	CONSTRAINT [PK_Menu] PRIMARY KEY (MenuId)	
)
