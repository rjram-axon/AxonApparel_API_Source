CREATE TABLE [dbo].[StockTranStock]
(
    [TransferStkId] [int] IDENTITY(1,1) NOT NULL,
	[TransferId] [int] NOT NULL,
	[TransferDetid] [int] NULL,
	[FromStockId] [int] NOT NULL,
	[TransQty] [numeric](12, 3) NULL,
	[Markup_Rate] [numeric](15, 5) NULL DEFAULT (0),
	[NEWSTOCKID] [int] NULL, 
    CONSTRAINT [PK_StockTranStock] PRIMARY KEY ([TransferStkId]), 
    CONSTRAINT [FK_StockTranStock_ItemStock] FOREIGN KEY ([FromStockId]) REFERENCES [ItemStock]([StockId]),
	CONSTRAINT [FK_StockTranStock_NewItemStock] FOREIGN KEY ([NEWSTOCKID]) REFERENCES [ItemStock]([StockId])
)
