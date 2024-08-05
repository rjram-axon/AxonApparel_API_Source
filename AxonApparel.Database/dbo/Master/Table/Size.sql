CREATE TABLE [dbo].[Size]
(
	
	[SizeId] [int] IDENTITY(1,1) NOT NULL,
	[Size] [varchar](40) NOT NULL DEFAULT (null),
	[Item_Type] [varchar](15)  NULL,
	[Lookup] [varchar](30) NULL,
	[ActualSize] [numeric](12, 0) NOT NULL DEFAULT ('0'),
	[IsActive] [bit] NOT NULL DEFAULT (1),
	[SeqNo] [int] NULL, 
    CONSTRAINT [PK_Size] PRIMARY KEY ([SizeId])
)
