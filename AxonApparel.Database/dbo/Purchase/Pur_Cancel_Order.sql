CREATE TABLE [dbo].[Pur_Cancel_Order]
(
    [CancelOrdID] INT IDENTITY(1,1) NOT NULL,
	[CancelDetID] [int] NOT NULL,
	[CancelId] [int] NOT NULL,
	[Pur_Ord_BuyJobid][int] NULL,
	[OrderNo] [varchar](20) NOT NULL,
	[StyleId] [int] NOT NULL,
	[ColorID] [int] NOT NULL,
	[SizeID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[UOMid] [int] NOT NULL,
	[CancelQty] [numeric](14, 3) NOT NULL DEFAULT (0), 
    CONSTRAINT [PK_Pur_Cancel_Order] PRIMARY KEY ([CancelOrdID]), 
    CONSTRAINT [FK_Pur_Cancel_Order_Pur_Cancel_Det] FOREIGN KEY ([CancelDetID]) REFERENCES [Pur_Cancel_Det]([CancelDetID]),
	CONSTRAINT [FK_Pur_Cancel_Order_Pur_Cancel_Mas] FOREIGN KEY ([CancelId]) REFERENCES [Pur_Cancel_Mas]([CancelId]),
	CONSTRAINT [FK_Pur_Cancel_Order_StyleHeader] FOREIGN KEY ([StyleId]) REFERENCES [StyleHeader]([StyleId]),
CONSTRAINT [FK_Pur_Cancel_Color] FOREIGN KEY ([ColorID]) REFERENCES [Color]([ColorId]), 	
	 CONSTRAINT [FK_Pur_Cancel_Size] FOREIGN KEY ([SizeID]) REFERENCES [Size]([SizeId]), 
	  CONSTRAINT [FK_Pur_Cancel_Item] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]), 
	    CONSTRAINT [FK_Pur_Cancel_UomId] FOREIGN KEY ([UOMid]) REFERENCES [Unit_of_measurement]([uomid]),
		 CONSTRAINT [FK_Pur_Cancel_PurBuyJob] FOREIGN KEY ([Pur_Ord_BuyJobid]) REFERENCES [Pur_Ord_BuyJob]([Pur_Ord_BuyJobid])
)
