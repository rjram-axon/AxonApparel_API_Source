CREATE TABLE [dbo].[Prod_Recpt_Stock]
(
	[RecptStockId] INT IDENTITY(1,1) NOT NULL,
	[RecptID] [int] NOT NULL,
	[RecptDetID] [int] NOT NULL,
	[BundleNo] [varchar](20) NULL,
	[StockID] [int] NOT NULL,
	[RecptQty] [numeric](12, 3) NOT NULL,
	[InvQty] [numeric](12, 3) NOT NULL Default(0),
	[Closed] [char](1) NOT NULL Default('N'),
	CONSTRAINT [PK_ProdRecptStockid] PRIMARY KEY ([RecptStockId]),
	CONSTRAINT UC_RecptDet UNIQUE ([RecptID],[RecptDetID])
)
