CREATE TABLE [dbo].[S2PhotoSuit]
(
	[S2EntryId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Buy_Ord_MasId] [int] not null,
	[Fabric] [varchar](100) NULL,
	[Elastic] [varchar](100) NULL,
	PhotoSuitSmpleSew [varchar](100) NULL,
	PhotoSuitSmpleSubmit [varchar](100) NULL,	
	[Remarks] [varchar](100) NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,

	CONSTRAINT [FK_S2_buymas] FOREIGN KEY ([Buy_Ord_MasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId])
)
