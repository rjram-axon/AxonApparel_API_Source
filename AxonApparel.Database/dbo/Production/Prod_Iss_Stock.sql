CREATE TABLE [dbo].[Prod_Iss_Stock]
(
	[ProdIssStockId] INT IDENTITY(1,1) NOT NULL,
	[ProdIssueJobid] [int] NULL,
	[ItemStockId] [int] NULL,
	[IssueQty] [numeric](14, 3) NULL Default(0.000),
	[ReturnQty] [numeric](14, 3) NULL Default(0.000),
	[LossQty] [numeric](14, 3) NULL Default(0.000),
	[Returnable_Qty] [numeric](14, 3) NULL Default(0),
	[Markup_Rate] [numeric](15, 5) NULL Default(0),
	[LotNo] [varchar](20) NULL Default(''),
	Itemid int null,
	Colorid int null,
	Sizeid int null,

	CONSTRAINT [PK_ProdIssstckid] PRIMARY KEY ([ProdIssStockId]),
	CONSTRAINT [FK_ProdIssJobDetRefid] FOREIGN KEY ([ProdIssueJobid]) REFERENCES [Prod_iss_JobDet]([ProdIssueJobId]),
	CONSTRAINT [FK_ProdStockIdRefid] FOREIGN KEY ([ItemStockId]) REFERENCES [ItemStock]([StockId]),
)
