CREATE TABLE [dbo].[StockAllocationSection]
(
	[StockAllocationSectionID] [int] IDENTITY(1,1) NOT NULL primary key,
	[AllocationId] [int] NOT NULL,
	[AllocationDetID] [int] NOT NULL,
	[SectionID] [int] NOT NULL,
	[AllocationQty] [numeric](14, 5) NOT NULL DEFAULT (0),
	[NewStockID] [int] NULL,
	[OldStockID][int] NULL,

	CONSTRAINT [fk_stkallocsec_allocid] FOREIGN KEY([AllocationId]) REFERENCES [dbo].[StockAllocationMas] ([AllocationID]),
	CONSTRAINT [fk_stkallocsec_allocdetid] FOREIGN KEY([AllocationDetID]) REFERENCES [dbo].[StockAllocationDet] ([AllocationDetID]),
	CONSTRAINT [fk_stkallocsec_stockid] FOREIGN KEY([NewStockID]) REFERENCES [dbo].[ItemStock] ([StockId]),
	CONSTRAINT [fk_stkallocsec_OldStockID] FOREIGN KEY([OldStockID]) REFERENCES [dbo].[ItemStock] ([StockId]),
	CONSTRAINT [fk_stkallocsec_secid] FOREIGN KEY([SectionID]) REFERENCES [dbo].[StoreSection] ([SectionID])
	
)
