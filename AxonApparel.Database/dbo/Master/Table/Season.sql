CREATE TABLE [dbo].[Season]
(
	[SeasonId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Season] [varchar](40) NOT NULL,
	[IsActive] [bit] Default Char(1) NOT NULL
)
