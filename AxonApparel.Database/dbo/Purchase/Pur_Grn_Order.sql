CREATE TABLE [dbo].[Pur_Grn_Order]
(
	[Grn_DetOrdId] [int] IDENTITY(1,1) NOT NULL, 
	[grn_detid] [int] NULL,
	[quantity] [numeric](15, 3) NOT NULL DEFAULT (0),
	[pur_ord_detid] [int] NULL,
	[actual_mfrid] [int] NULL,
	[Rate] [numeric](15, 5) NOT NULL DEFAULT (0),
	[Invoiced_Qty] [numeric](12, 3) NULL DEFAULT (0.00),
	[Rate_Diff] [numeric](15, 5) NOT NULL DEFAULT (0),
	[Excess_Qty] [numeric](14, 3) NULL,
	[ItemID] [int] NULL,
	[SizeID] [int] NULL,
	[ColorID] [int] NULL,
	[UOMId] [int] NULL,
     CONSTRAINT [PK_Pur_Grn_Order] PRIMARY KEY ([Grn_DetOrdId]), 
     CONSTRAINT [FK_Pur_Grn_Order_Grn_det] FOREIGN KEY ([grn_detid]) REFERENCES [Pur_Grn_Det]([Grn_DetId]),
	 CONSTRAINT [FK_Pur_Grn_Order_Pur_Ord_det] FOREIGN KEY ([pur_ord_detid]) REFERENCES [Pur_Ord_Det]([Pur_Ord_Detid]),
	 CONSTRAINT [FK_Pur_Grn_Order_Employee] FOREIGN KEY ([actual_mfrid]) REFERENCES [supplier]([supplierid]),
	 CONSTRAINT [FK_Pur_Grn_Order_Color] FOREIGN KEY ([ColorID]) REFERENCES [Color]([ColorId]), 	
	 CONSTRAINT [FK_Pur_Grn_Order_Size] FOREIGN KEY ([SizeID]) REFERENCES [Size]([SizeId]), 
	 CONSTRAINT [FK_Pur_Grn_Order_Item] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]), 
	 CONSTRAINT [FK_Pur_Grn_Order_UomId] FOREIGN KEY ([UOMid]) REFERENCES [Unit_of_measurement]([uomid])
)
