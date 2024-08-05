CREATE TABLE [dbo].[Pur_Cancel_Mas]
(
	[CancelId] INT IDENTITY(1,1) NOT NULL, 
	[Pur_Ord_Id] [int] NOT NULL,
	[CancelNo] [varchar](20) NOT NULL,
	[CancelDate] [datetime] NULL,
	[CancelledBY] [varchar](50) NOT NULL DEFAULT (''),
	[Remarks] [varchar](500) NOT NULL DEFAULT (''),
    CONSTRAINT [PK_Pur_Cancel_Mas] PRIMARY KEY ([CancelId]), 
    CONSTRAINT [FK_Pur_Cancel_Mas_pur_ord_mas] FOREIGN KEY ([Pur_Ord_Id]) REFERENCES [pur_ord_mas]([pur_ord_id]), 
)
