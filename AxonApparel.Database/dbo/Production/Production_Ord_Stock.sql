CREATE TABLE [dbo].[Production_Ord_Stock]
(
	[ProductionOrdStockId] [int] IDENTITY(1,1) NOT NULL primary key,
	Productionordid int null,
	Productionorder [varchar](20) NULL,
	[ProductionOrdJobid] [int] NULL,
	[Job_ord_no] [varchar](20) NULL,
	[ItemStockId] [int] NULL,
	[IssueQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[ReturnQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[LossQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[Returnable_Qty] [numeric](14, 3) NULL DEFAULT (0),
	[Markup_Rate] [numeric](15, 5) NULL DEFAULT (0),
	[LotNo] [varchar](20) NOT NULL DEFAULT (''),
	Itemid int null,
	Colorid int null,
	Sizeid int null,

	CONSTRAINT [FK_Prod_Iss_Stock_ItemStockID] FOREIGN KEY([ItemStockId]) REFERENCES [dbo].[ItemStock] ([StockId]),

)
