CREATE TABLE [dbo].[Stores_Issue_ReturnDet]
(
	[ReturnDetid] INT IDENTITY(1,1) NOT NULL, 
	[Returnid] [int] NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[Joborderno] [varchar](20) NOT NULL DEFAULT (''),
	[ReturnQty] [numeric](12, 3) NOT NULL DEFAULT (0),
	[secqty] [numeric](12, 3) NOT NULL DEFAULT (0),
	[Stockid] [int] NULL,
	[Itemremarks] [varchar](60) NOT NULL DEFAULT (''),
	[IssueStockID] [int] NULL,
    [AcceptedQty] [numeric](12, 3) NOT NULL DEFAULT (0),
    CONSTRAINT [PK_Stores_Issue_ReturnDet] PRIMARY KEY ([ReturnDetid]), 
	CONSTRAINT [FK_Stores_Issue_ReturnDet_IssRetMas] FOREIGN KEY ([Returnid]) REFERENCES [Stores_Issue_ReturnMas]([ReturnId]), 
	CONSTRAINT [FK_Stores_Issue_ReturnDet_Itmstk] FOREIGN KEY ([stockid]) REFERENCES [ItemStock]([StockId]), 
    CONSTRAINT [FK_Stores_Issue_ReturnDet_Item] FOREIGN KEY ([Itemid]) REFERENCES [Item]([ItemId]), 
	CONSTRAINT [FK_Stores_Issue_ReturnDet_Color] FOREIGN KEY ([Colorid]) REFERENCES [Color]([ColorId]), 
	CONSTRAINT [FK_Stores_Issue_ReturnDet_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([SizeId])
)
