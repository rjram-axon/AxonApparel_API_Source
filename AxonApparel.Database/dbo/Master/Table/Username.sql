CREATE TABLE [dbo].[Username]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Username] [varchar](25) NULL,
	[Groupid] INT FOREIGN KEY REFERENCES USERGROUP(groupid),
	[Grouptype] [varchar](20) null,
	[Password] NVARCHAR(250) null,
	[ConPassword] NVARCHAR(250) null,
	[EmployeeId] int foreign key references Employee(EmployeeID) ,
	Roleid int null,
	[Question] [varchar](250) NULL,
	[Answer] [varchar](100) NULL,
	[ChangePass] [varchar](1) NULL DEFAULT ('N'),
	[VCode] [nvarchar] (250),
	LoginStatus [char](1) Null,
	[LoginPC] VARCHAR(50) NULL, 
    CONSTRAINT [FK_User_Roleid] FOREIGN KEY (Roleid) REFERENCES [Role_Mas](RoleId)
)
