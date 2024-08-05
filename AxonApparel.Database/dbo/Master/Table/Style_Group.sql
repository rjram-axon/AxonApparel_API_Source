CREATE TABLE [dbo].[Style_Group](
	[StyleGroupID] [int] IDENTITY(1,1) NOT NULL,
	[StyleGroup] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1) , 
    CONSTRAINT [PK_Style_Group] PRIMARY KEY ([StyleGroupID])
)
