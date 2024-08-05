CREATE TABLE [dbo].[CSPReceiptDet]
(
	[ReceiptDetId] [int] IDENTITY(1,1) NOT NULL primary key,
	[ReceiptID] [int] NOT NULL,
	[Itemid] [int] NOT NULL,
	[Colorid] [int] NOT NULL,
	[Sizeid] [int] NOT NULL,
	[UomId] [int] NOT NULL,
	[Quantity] [numeric](15, 3) NOT NULL DEFAULT (0),
	[SecQty] [numeric](15, 3) NOT NULL DEFAULT (0),
	[SecUomID] [int] NULL,
	[StockID] [int] NULL,
	[AcceptQty] [numeric](15, 3) NOT NULL DEFAULT (0),
	[RejectedQty] [numeric](15, 3) NOT NULL DEFAULT (0),
	

	CONSTRAINT [fk_cspreceiptdet_colorid] FOREIGN KEY([Colorid]) REFERENCES [dbo].[color] ([colorid]),
	CONSTRAINT [fk_cspreceiptdet_itemid] FOREIGN KEY([Itemid]) REFERENCES [dbo].[Item] ([itemid]),
	CONSTRAINT [fk_cspreceiptdet_receiptid] FOREIGN KEY([ReceiptID]) REFERENCES [dbo].[CSPReceiptMas] ([ReceiptID]),
	CONSTRAINT [fk_cspreceiptdet_SecUomID] FOREIGN KEY([SecUomID]) REFERENCES [dbo].[Unit_of_measurement] ([uomid]),
	CONSTRAINT [fk_cspreceiptdet_sizeid] FOREIGN KEY([Sizeid]) REFERENCES [dbo].[size] ([sizeid]),
	CONSTRAINT [fk_cspreceiptdet_uomid] FOREIGN KEY([UomId]) REFERENCES [dbo].[Unit_of_measurement] ([uomid]),

)
