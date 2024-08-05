CREATE TABLE [dbo].[ColorGroup]
(
	[ColorGroupID] [int] IDENTITY(1,1) NOT NULL,
	[ColorGroup] [varchar](50) NOT NULL,
	[IsActive] [bit] NULL, 
    CONSTRAINT [PK_ColorGroup] PRIMARY KEY ([ColorGroupID])
)
