CREATE TABLE [dbo].[Job_Recpt_Det]
(
	[JobRecptDetId] [int] IDENTITY(1,1) NOT NULL,
	[JobRecptId] [int] NOT NULL,
	[ItemId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[LotNo] [varchar](20) NULL DEFAULT (''),
	[RecptQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[SecQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[InvoiceQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[Rate] [numeric](8, 3) NOT NULL DEFAULT (0),
	[AcceptedQty] [numeric](14, 3) NULL,
	[DespatchQty] [numeric](14, 3) NULL,
	[RejQty] [numeric](9, 0) NULL, 
	[ExcessQty] [numeric](14, 3) NULL,
	[LooseQty] [numeric](14, 3) NULL,
    CONSTRAINT [PK_Job_Recpt_Det] PRIMARY KEY ([JobRecptDetId]), 
    CONSTRAINT [FK_Job_Recpt_Det_Job_Recpt_Mas] FOREIGN KEY ([JobRecptId]) REFERENCES [Job_Recpt_Mas]([JobRecptId]),
	CONSTRAINT [FK_Job_Recpt_Det_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Job_Recpt_Det_Color] FOREIGN KEY ([ColorId]) REFERENCES [Color]([ColorId]),
	CONSTRAINT [FK_Job_Recpt_Det_Size] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId])
)
