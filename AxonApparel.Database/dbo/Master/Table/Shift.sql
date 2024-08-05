CREATE TABLE [dbo].[Shift]
(
	[shiftid] INT IDENTITY(1,1) NOT NULL,
	[Shift] [varchar](30) NOT NULL,
	[RegularOrOT] [char](1) NULL,
	[IsActive] [bit] NOT NULL,
	CONSTRAINT [PK_shiftrefid] PRIMARY KEY ([shiftid]),	
)
