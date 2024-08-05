CREATE TABLE [dbo].[ItemGroup]
(
	[Id] INT NOT NULL PRIMARY KEY identity(1,1),
	ItemGroup varchar(40)not null,
	Category1 varchar(40)not null,
	Category2 varchar(40)not null,
	Category3 varchar(40)not null,
	IsActive bit not null default(1)
)
