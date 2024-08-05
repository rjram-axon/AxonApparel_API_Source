CREATE TABLE [dbo].[TestingType]
(
	[TestingTypeId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	TestingType varchar(60), 
	GarFab char(1) NULL,
    [IsActive] [bit] NOT NULL DEFAULT (1)
)
