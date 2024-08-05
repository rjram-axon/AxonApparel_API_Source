CREATE TABLE [dbo].[pur_grn_qlty_det]
(
	[PurGrnQltydetId] INT IDENTITY(1,1) NOT NULL, 
	[grn_detid] [int] NULL,
	[pur_ord_detid] [int] NULL,
	[pur_ord_buyjobid] [int] NULL,
	[accept_qty] [numeric](12, 3) NULL DEFAULT (0),
	[debit_qty] [numeric](12, 3) NULL DEFAULT (0),
	[receivable_qty] [numeric](12, 3) NULL DEFAULT (0),
	[Excess_Qty] [numeric](14, 3) NULL,
	[Returnqty] [numeric](14, 3) NULL,
		[ItemID] [int] NULL,
	[SizeID] [int] NULL,
	[ColorID] [int] NULL,
	[UOMId] [int] NULL,
    CONSTRAINT [PK_pur_grn_qlty_det] PRIMARY KEY ([PurGrnQltydetId]), 
    CONSTRAINT [FK_pur_grn_qlty_det_Pur_grn_det] FOREIGN KEY ([grn_detid]) REFERENCES [Pur_grn_det]([grn_detid]), 
	CONSTRAINT [FK_pur_grn_qlty_det_Pur_Ord_BuyJob] FOREIGN KEY ([pur_ord_buyjobid]) REFERENCES [Pur_Ord_BuyJob]([Pur_Ord_BuyJobid]), 
     CONSTRAINT [FK_pur_grn_qlty_det_pur_ord_det] FOREIGN KEY ([pur_ord_detid]) REFERENCES [pur_ord_det]([Pur_Ord_DetId]),
	 CONSTRAINT [FK_pur_grn_qlty_det_Color] FOREIGN KEY ([ColorID]) REFERENCES [Color]([ColorId]), 	
	 CONSTRAINT [FK_pur_grn_qlty_det_Size] FOREIGN KEY ([SizeID]) REFERENCES [Size]([SizeId]), 
	 CONSTRAINT [FK_pur_grn_qlty_det_Item] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]), 
	 CONSTRAINT [FK_pur_grn_qlty_det_UomId] FOREIGN KEY ([UOMid]) REFERENCES [Unit_of_measurement]([uomid])
)
