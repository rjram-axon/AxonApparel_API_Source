CREATE TABLE [dbo].[Role_Det]
(
	DetId [int] IDENTITY(1,1) NOT NULL,
	RoleId int NOT NULL,
	MenuId int NOT NULL,
	AllFlg int NOT NULL,
	AddFlg int NOT NULL,
	EditFlg int NOT NULL,
	DeleteFlg int NOT NULL,
	PrintFlg int NOT NULL,
	CONSTRAINT [PK_Role_Det] PRIMARY KEY (DetId),
	CONSTRAINT [FK_Menu_RefList] FOREIGN KEY ([MenuId]) REFERENCES [MenuList]([MenuId]),	
	CONSTRAINT [FK_RoleRef] FOREIGN KEY ([RoleId]) REFERENCES [Role_Mas](RoleId),	
)
