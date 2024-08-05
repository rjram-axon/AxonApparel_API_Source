CREATE TABLE [dbo].[Buy_Ord_OrderDet_Amend]
(
	[Buy_Ord_OrderDetAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Buy_Ord_OrderDetId] [int] NULL,
    [Buy_Ord_Ship] [varchar](8) NOT NULL,
	[SizeId] [int] NOT NULL,
	[Ratio] [numeric](14, 3) NULL,
	[Quantity] [numeric](14, 3) NULL,
	[Job_Qty] [numeric](8, 0) NULL,
	[Finish_Qty] [numeric](8, 0) NULL,
	[StyleRow] [int] NULL,
	[ShipRow] [int] NULL,
	[SizeRow] [int] NULL,
	[Order_No] [varchar](20) NULL,
	[Rate] [numeric](15, 5) NULL,
	[ComboId] [int] NULL,
	[Despatch_Qty] [int] NULL,
	[ComboRow] [int] NULL,
	[Packed_Qty] [numeric](8, 0) NOT NULL DEFAULT (0), 
	[SlNo][int] NULL,
	[AllowPer] NUMERIC(15, 5) NULL, 
    [ProdQty] NUMERIC(15, 5) NULL,
	[ItemId] INT NULL,
  
    CONSTRAINT [FK_Buy_Ord_OrderDet_am_Size] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId]),
	CONSTRAINT [FK_Buy_Ord_OrderDet_am_Color] FOREIGN KEY ([ComboId]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_Buy_Ord_OrderDet_am_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	--CONSTRAINT [FK_Buy_Ord_OrderDet_Buy_ord_ship] FOREIGN KEY ([ShipRow]) REFERENCES [Buy_Ord_Ship]([ShipRowId])
)
