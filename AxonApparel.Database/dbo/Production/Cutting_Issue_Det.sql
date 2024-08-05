CREATE TABLE [dbo].[Cutting_Issue_Det]
(
	[CuttingIssueDetId] INT IDENTITY(1,1) NOT NULL,
	[CuttingIssueId] [int] NULL,
	[itemid] [int] NULL,
	[colorid] [int] NULL,
	[sizeid] [int] NULL,
	[IssueQty] [numeric](12, 3) NOT NULL Default('0'),
	[ReturnQty] [numeric](12, 3) NOT NULL Default('0'),
	[LossQty] [numeric](12, 3) NOT NULL Default('0'),
	[SecQty] [numeric](12, 3) NOT NULL Default('0'),
	[IPMarkup_rate] [numeric](14, 2) NOT NULL Default('0'),
	[LastProcessid] [int] NULL,
	CONSTRAINT [PK_CuttinIssuedetid] PRIMARY KEY ([CuttingIssueDetId]),
	CONSTRAINT [FK_CuttingIssueMasId] FOREIGN KEY ([CuttingIssueId]) REFERENCES [Cutting_Issue_Mas]([CuttingIssueId]),
	CONSTRAINT [FK_CuttingColorId] FOREIGN KEY ([colorid]) REFERENCES [color]([Colorid]),
	CONSTRAINT [FK_CuttingProcessId] FOREIGN KEY ([LastProcessid]) REFERENCES [process]([ProcessId]),
	CONSTRAINT [FK_CuttingSizeId] FOREIGN KEY ([sizeid]) REFERENCES [size]([SizeId]),

)
