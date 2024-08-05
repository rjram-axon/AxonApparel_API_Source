CREATE TABLE [dbo].[P3Entry]
(
	[P3EntryId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Buy_Ord_MasId] [int] not null,
	[Yarn_PO] [varchar](100) NULL,
	[Yarn_IH] [varchar](100) NULL,
	[Fab_IH] [varchar](100) NULL,
	[Remarks] [varchar](100) NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,

	CONSTRAINT [FK_p3_buymas] FOREIGN KEY ([Buy_Ord_MasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId])
)
