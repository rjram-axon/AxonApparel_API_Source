CREATE TABLE [dbo].[UserGroup]
(
	[GroupId] INT NOT NULL PRIMARY KEY identity(1,1),
	[GroupName] [varchar](25) NULL,
	[Description] [varchar](750) NULL,
	[GroupType] [char](1) NOT NULL default('E'),
	CONSTRAINT [chk_user_group_GroupType] CHECK  (([GroupType] = 'B' or [GroupType] = 'E' or [GroupType] = 'S' or [GroupType] = 'A')),
)
