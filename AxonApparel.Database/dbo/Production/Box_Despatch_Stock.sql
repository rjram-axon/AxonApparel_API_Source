CREATE TABLE [dbo].[Box_Despatch_Stock](
	[DespatchStockid] [int] IDENTITY(1,1) NOT NULL,
	[DespatchDetid] [int] NULL,
	[DespatchId] [int] NULL,
	[StockId] [int] NULL,
	[Qty] [numeric](9, 3) NULL,
	[OldQty] NUMERIC(9, 3) NULL, 
    CONSTRAINT [Pk_Box_Despatch_Stock_DespatchStockid] PRIMARY KEY([despatchstockid]),
	CONSTRAINT [Fk_Box_Despatch_Stock_DespatchDetid] FOREIGN KEY([despatchdetid]) REFERENCES [dbo].[Box_Despatch_Det] ([DespatchDetid]),
	CONSTRAINT [Fk_Box_Despatch_Stock_DespatchId] FOREIGN KEY([despatchid]) REFERENCES [dbo].[Box_Despatch_mas] ([DespatchId]),
	CONSTRAINT [Fk_Box_Despatch_Stock_StockId] FOREIGN KEY([stockid]) REFERENCES [dbo].[ItemStock] ([StockId])
	)

