CREATE TABLE [dbo].[SampleTypeMaster]
(
	[SampleTypeId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	SampleType varchar(60), 
    [IsActive] [bit] NOT NULL DEFAULT (1)
)
