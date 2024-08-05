CREATE TABLE [dbo].[Cutting_Issue_Stock]
(
	[CuttingIssueStockId] INT IDENTITY(1,1) NOT NULL, 
	[CuttingIssueId] [int] NULL,
	[CuttingIssueDetId] [int] NULL,
	[StockId] [int] NULL,
	[IssueQty] [numeric](14, 3) NOT NULL Default('0'),
	[MarkUp_Rate] [numeric](12, 2) NOT NULL Default('0'),
	[ReturnQty] [numeric](12, 3) NOT NULL Default('0'),
	[LossQty] [numeric](12, 3) NOT NULL Default('0'),
	CONSTRAINT [PK_CuttinIssueStockid] PRIMARY KEY ([CuttingIssueStockId]),
	CONSTRAINT [FK_CuttingIssueRefMasId] FOREIGN KEY ([CuttingIssueId]) REFERENCES [Cutting_Issue_Mas]([CuttingIssueId]),
	CONSTRAINT [FK_CuttingIssueRefDetId] FOREIGN KEY ([CuttingIssueDetId]) REFERENCES [Cutting_Issue_Det]([CuttingIssueDetId])
)
