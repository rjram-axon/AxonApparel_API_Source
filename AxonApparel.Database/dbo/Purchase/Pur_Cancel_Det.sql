CREATE TABLE [dbo].[Pur_Cancel_Det]
(
	[CancelDetID] INT IDENTITY(1,1) NOT NULL,
	[CancelId] [int] NOT NULL, 
	[ItemId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[UomId] [int] NOT NULL,
	[Pur_Ord_DetId][int] NOT NULL,
	[CancelQty] [numeric](14, 3) NOT NULL DEFAULT (0),
    CONSTRAINT [PK_Pur_Cancel_Det] PRIMARY KEY ([CancelDetID]), 
    CONSTRAINT [FK_Pur_Cancel_Det_Pur_Cancel_Mas] FOREIGN KEY ([CancelId]) REFERENCES [Pur_Cancel_Mas]([CancelId]), 
	CONSTRAINT [FK_Pur_Cancel_Det_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]), 
	CONSTRAINT [FK_Pur_Cancel_Det_Color] FOREIGN KEY ([ColorId]) REFERENCES [Color]([ColorId]), 
	CONSTRAINT [FK_Pur_Cancel_Det_Size] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId]), 
	CONSTRAINT [FK_Pur_Cancel_Det_Unit_of_measurement] FOREIGN KEY ([UomId]) REFERENCES [Unit_of_measurement]([UomId]),
	CONSTRAINT [FK_Pur_Cancel_Det_Pur_ORd_det] FOREIGN KEY ([Pur_Ord_DetId]) REFERENCES [pur_ord_det]([Pur_Ord_DetId])
)
