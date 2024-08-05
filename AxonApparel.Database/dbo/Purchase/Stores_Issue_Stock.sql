CREATE TABLE [dbo].[Stores_Issue_Stock]
(
	[IssueStockID] INT IDENTITY(1,1) NOT NULL, 
	[IssueDetId] [int] NULL,
	[ItemStockId] [int] NULL,
	[quantity] [numeric](15, 3) NOT NULL DEFAULT (0),
	[Sec_qty] [numeric](12, 3) NULL DEFAULT (0),
	[IssueOrdId] [int] NULL,
		[ItemID] [int] NULL,
	[SizeID] [int] NULL,
	[ColorID] [int] NULL,
	[UOMId] [int] NULL,
    CONSTRAINT [PK_Stores_Issue_Stock] PRIMARY KEY ([IssueStockID]), 
    CONSTRAINT [FK_Stores_Issue_Det] FOREIGN KEY ([IssueDetId]) REFERENCES [dbo].[Stores_Issue_det] ([IssuedetId]),
	CONSTRAINT [FK_stores_issue_order] FOREIGN KEY([IssueOrdId]) REFERENCES [dbo].[stores_issue_order] ([IssueOrdID]),
	CONSTRAINT [FK_stores_itemStock] FOREIGN KEY([ItemStockId]) REFERENCES [dbo].[ItemStock] ([StockId]),
    CONSTRAINT [FK_Stores_Issue_Color] FOREIGN KEY ([ColorID]) REFERENCES [Color]([ColorId]), 	
	 CONSTRAINT [FK_Stores_Issue_Size] FOREIGN KEY ([SizeID]) REFERENCES [Size]([SizeId]), 
	 CONSTRAINT [FK_Stores_Issue_Item] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]), 
	 CONSTRAINT [FK_Stores_Issue_UomId] FOREIGN KEY ([UOMid]) REFERENCES [Unit_of_measurement]([uomid])
)
