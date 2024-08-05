CREATE TABLE [dbo].[StockAllocationDet]
(
	[AllocationId] [int] NOT NULL,
	[AllocationDetID] [int] IDENTITY(1,1) NOT NULL primary key,
	[StockID] [int] NOT NULL,
	[ItemId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[Qty] [numeric](14, 5) NOT NULL DEFAULT (0),

	CONSTRAINT [fk_stkallocdet_allocid] FOREIGN KEY([AllocationId]) REFERENCES [dbo].[StockAllocationMas] ([AllocationID]),
	CONSTRAINT [fk_stkallocdet_colorid] FOREIGN KEY([ColorId]) REFERENCES [dbo].[color] ([colorid]),
	CONSTRAINT [fk_stkallocdet_itemid] FOREIGN KEY([ItemId]) REFERENCES [dbo].[Item] ([itemid]),
	CONSTRAINT [fk_stkallocdet_sizeid] FOREIGN KEY([SizeId]) REFERENCES [dbo].[size] ([sizeid]),
	CONSTRAINT [fk_stkallocdet_stockid] FOREIGN KEY([StockID]) REFERENCES [dbo].[ItemStock] ([StockId])
)
