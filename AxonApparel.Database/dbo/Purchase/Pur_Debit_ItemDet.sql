CREATE TABLE [dbo].[Pur_Debit_ItemDet]
(
	[Debit_detid] [int] IDENTITY(1,1) NOT NULL,
	[Debit_id] [int] NULL,
	[Itemid] [int] NULL,
	[colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[uomid] [int] NULL,
	[ReturnQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[Qty] [numeric](14, 3) NULL DEFAULT (0.000),
	[dQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[Rate] [numeric](7, 2) NULL DEFAULT (0.000),
	[dRate] [numeric](7, 2) NULL DEFAULT (0.000),
	[Amount] [numeric](14, 2) NULL DEFAULT (0.000),
	[grn_detid] [int] NULL,
	[DocType] [varchar](1) NULL,
	[Excess_qty] [numeric](14, 3) NOT NULL DEFAULT (0), 
	    CONSTRAINT [FK_Pur_Debit_ItemDet_Pur_Debit_Mas] FOREIGN KEY ([Debit_id]) REFERENCES [Pur_Debit_Mas]([Debit_id]),
    CONSTRAINT [FK_Pur_Debit_ItemDet_Item] FOREIGN KEY ([Itemid]) REFERENCES [Item]([ItemId]),
	 CONSTRAINT [FK_Pur_Debit_ItemDet_Color] FOREIGN KEY ([colorid]) REFERENCES [Color]([ColorId]),
	  CONSTRAINT [FK_Pur_Debit_ItemDet_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([SizeId]),
	   CONSTRAINT [FK_Pur_Debit_ItemDet_Uom] FOREIGN KEY ([uomid]) REFERENCES [Unit_of_measurement]([uomid]), 
    CONSTRAINT [PK_Pur_Debit_ItemDet] PRIMARY KEY ([Debit_detid])
)
