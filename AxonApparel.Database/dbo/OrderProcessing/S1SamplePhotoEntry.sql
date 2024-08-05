CREATE TABLE [dbo].[S1SamplePhotoEntry]
(
	[S1EntryId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Buy_Ord_MasId] [int] not null,
	[FabIH] [varchar](100) NULL,
	[ElasticIH] [varchar](100) NULL,
	ProtoSew [varchar](100) NULL,
	ProtoSubmit [varchar](100) NULL,
	FitSubmit [varchar](100) NULL,
	WearTrial [varchar](100) NULL,
	[Remarks] [varchar](100) NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,

	CONSTRAINT [FK_S1_buymas] FOREIGN KEY ([Buy_Ord_MasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId])
)
