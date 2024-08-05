﻿CREATE TABLE [dbo].[Indent_BuyJob]
(
	[Indent_BuyJobid] [int] IDENTITY(1,1) NOT NULL,
	[Order_No] [varchar](20) NULL,
	[Job_No] [varchar](20) NULL,
	[Buy_Ord_BomDetid] [int] NULL,
	[Quantity] [numeric](14, 3) NULL DEFAULT (0),
	[IndentDetid] [int] NULL,
	[IndentMasid] [int] NULL,
	[PurordQty] [numeric](14, 3) NULL DEFAULT (0),
	[ReceivedQty] [numeric](14, 3) NULL DEFAULT (0),
	[Cancel_Qty] [numeric](14, 3) NULL DEFAULT (0),
	[ItemCode] [varchar](30) NULL DEFAULT (''),
	[ItemRemarks] [varchar](150) NULL DEFAULT (''),
	[PurcancelQty] [numeric](14, 3) NULL DEFAULT (0), 
	[ItemID] [int] NULL,
	[SizeID] [int] NULL,
	[ColorID] [int] NULL,
	[UOMId] [int] NULL,
    CONSTRAINT [PK_Indent_BuyJob] PRIMARY KEY ([Indent_BuyJobid]), 
    CONSTRAINT [FK_Indent_BuyJob_Buy_Ord_Bomdet] FOREIGN KEY ([Buy_Ord_BomDetid]) REFERENCES [Buy_Ord_BOMDet]([Buy_Ord_BomDetid]),
	CONSTRAINT [FK_Indent_BuyJob_Indent_Det] FOREIGN KEY ([IndentDetid]) REFERENCES [Indent_Det]([IndentDetid]),
	CONSTRAINT [FK_Indent_BuyJob_Indent_Mas] FOREIGN KEY ([IndentMasid]) REFERENCES [Indent_Mas]([IndentMasid]),
	   CONSTRAINT [FK_Indent_BuyJob_Color] FOREIGN KEY ([ColorID]) REFERENCES [Color]([ColorId]), 	
	 CONSTRAINT [FK_Indent_BuyJob_Size] FOREIGN KEY ([SizeID]) REFERENCES [Size]([SizeId]), 
	  CONSTRAINT [FK_Indent_BuyJob_Item] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]), 
	    CONSTRAINT [FK_Indent_BuyJob_UomId] FOREIGN KEY ([UOMid]) REFERENCES [Unit_of_measurement]([uomid])
)