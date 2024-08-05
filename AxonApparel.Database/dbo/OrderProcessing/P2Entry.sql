CREATE TABLE [dbo].[P2Entry]
(
	[P2EntryId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Buy_Ord_MasId] [int] not null,
	[Description] [varchar](100) NULL,
	[Remarks] [varchar](100) NULL,
	[P1Date] [datetime] NULL,
	[P2Date] [datetime] NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,

	CONSTRAINT [FK_p2_buymas] FOREIGN KEY ([Buy_Ord_MasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId])
)
