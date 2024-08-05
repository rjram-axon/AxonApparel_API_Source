
CREATE TABLE [dbo].[Style](
	[StyleId] [int] IDENTITY(1,1) NOT NULL,
	[Style] [varchar](40) NOT NULL UNIQUE,
	[ItemId] [int] NOT NULL,	
	[IsActive] [bit] NOT NULL DEFAULT(1),
	[StyleGroupID] [int] NULL, 
    CONSTRAINT [PK_Style] PRIMARY KEY ([StyleId]), 
    CONSTRAINT [FK_Style_StyleGroup] FOREIGN KEY ([StyleGroupID]) REFERENCES [Style_Group]([StyleGroupID]), 
    CONSTRAINT [FK_Style_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId])
	)

