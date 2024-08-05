CREATE TABLE [dbo].[P1Entry]
(
	[P1EntryId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Buy_Ord_MasId] [int] not null,
	[Description] [varchar](100) NULL,
	[Remarks] [varchar](100) NULL,
	[EntryDate] [datetime] NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,

	CONSTRAINT [FK_p1_buymas] FOREIGN KEY ([Buy_Ord_MasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId])
)
