CREATE TABLE [dbo].[Prod_Recpt_Reason]
(
	RecptReasonId INT IDENTITY(1,1) NOT NULL,
	[RecptDetId] [int] NULL,
	[RecptId] [int] NULL,
	[ReasonId] [int] NULL,
	[Quantity] [numeric](14, 3) NOT NULL Default(0),
	[RType] [char](1) NOT NULL Default('R'),
	CONSTRAINT [PK_RecptReasonid] PRIMARY KEY (RecptReasonId),
	CONSTRAINT [FK_RecptDetIdRefid] FOREIGN KEY ([RecptDetId]) REFERENCES [Prod_Recpt_Det]([RecptDetID]),
	CONSTRAINT [FK_RecptMasIdRefid] FOREIGN KEY ([RecptId]) REFERENCES [Prod_Recpt_Mas]([RecptId]),
)
