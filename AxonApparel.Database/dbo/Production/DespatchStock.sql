CREATE TABLE [dbo].[DespatchStock]
(
	[DespatchStockId] INT IDENTITY(1,1) NOT NULL,
	[DespatchId] [int] NOT NULL,
	[DespatchDetId] [int] NOT NULL,
	[StockId] [int] NOT NULL,
	[DespatchQty] [numeric](14, 3) NOT NULL,

	CONSTRAINT [PK_DespatchStockRefid] PRIMARY KEY ([DespatchStockId]),
	CONSTRAINT [FK_DespMasRefId] FOREIGN KEY ([DespatchId]) REFERENCES [DespatchMas]([DespatchId]),
	CONSTRAINT [FK_DespatDetRefId] FOREIGN KEY ([DespatchDetId]) REFERENCES [DespatchDet]([DespatchDetId]),
	CONSTRAINT [FK_DespItemStockRefId] FOREIGN KEY ([StockId]) REFERENCES [ItemStock]([StockId])
)
