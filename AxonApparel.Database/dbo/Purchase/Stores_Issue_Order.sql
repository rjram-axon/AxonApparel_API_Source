CREATE TABLE [dbo].[Stores_Issue_Order]
(
	[IssueOrdID] INT IDENTITY(1,1) NOT NULL, 
	[IssueID] [int] NOT NULL,
	[IssueDetID] [int] NOT NULL,
	[OrderNo] [varchar](20) NOT NULL,
	[IssueQty] [numeric](15, 3) NULL DEFAULT (0),
	[UnitStockId] [int] NULL,
	[ReceivedQty] [numeric](12, 3) NOT NULL DEFAULT (0),
	[RejectedQty] [numeric](12, 3) NOT NULL DEFAULT (0),
	[RejectStockId] [int] NULL,
	[ReturnQty] [numeric](12, 3) NOT NULL DEFAULT (0),
	[ExcessQty] [numeric](9, 3) NULL, 
	[ItemID] [int] NULL,
	[SizeID] [int] NULL,
	[ColorID] [int] NULL,
	[UOMId] [int] NULL,
	[PlannedSizeID] [int] NULL,
    CONSTRAINT [PK_Stores_Issue_Order] PRIMARY KEY ([IssueOrdID]), 
    CONSTRAINT [FK_Stores_Issue_det_Ord] FOREIGN KEY ([IssueDetID]) REFERENCES [Stores_Issue_det]([IssuedetId]),
	 CONSTRAINT [FK_Stores_Issue_Order_Stores_Issue] FOREIGN KEY([IssueID]) REFERENCES [dbo].[Stores_Issue_mas] ([IssueId]),
	  CONSTRAINT [FK_Stores_Issue_Orde_Color] FOREIGN KEY ([ColorID]) REFERENCES [Color]([ColorId]), 	
	 CONSTRAINT [FK_Stores_Issue_Orde_Size] FOREIGN KEY ([SizeID]) REFERENCES [Size]([SizeId]), 
	 CONSTRAINT [FK_Stores_Issue_Orde_Item] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]), 
	 CONSTRAINT [FK_Stores_Issue_Order_UomId] FOREIGN KEY ([UOMid]) REFERENCES [Unit_of_measurement]([uomid])

)
