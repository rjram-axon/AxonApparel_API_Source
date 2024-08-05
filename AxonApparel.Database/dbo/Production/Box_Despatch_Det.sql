CREATE TABLE [dbo].[Box_Despatch_Det](
	[DespatchDetid] [int] IDENTITY(1,1) NOT NULL,
	[DespatchId] [int] NULL,
	[RequestNo] [varchar](20) NOT NULL,
	[SkuNo] [varchar](150) NOT NULL,
	[StockReqDetID] [int] NULL,
	[Qty] [numeric](9, 3) NULL,
	CONSTRAINT [Pk_Box_Despatch_Det_DespatchDetid] PRIMARY KEY([despatchdetid]),
	CONSTRAINT [Fk_Box_Despatch_Det_DespatchId] FOREIGN KEY([despatchid]) REFERENCES [dbo].[Box_Despatch_mas] ([DespatchId]),
	)