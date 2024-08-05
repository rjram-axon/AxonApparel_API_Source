CREATE TABLE [dbo].[Prod_iss_det]
(
	[ProdIssueDetId] INT IDENTITY(1,1) NOT NULL,
	[ProdIssueId] [int] NULL,
	[itemid] [int] NULL,
	[colorid] [int] NULL,
	[sizeid] [int] NULL,
	[Rate] [numeric](15, 5) NULL,
	[IssueQty] [numeric](14, 3) NULL Default('0.000'),
	[SecQty] [numeric](14, 3) NULL Default('0.000'),
	[ReturnQty] [numeric](14, 3) NULL Default('0.000'),
	[OutputUom] [int] NULL,
	[OutputValue] [numeric](15, 5) NULL Default(0),
	[IPMarkup_Rate] [numeric](15, 5) NULL Default(0),

	CONSTRAINT [PK_ProductionIssDetid] PRIMARY KEY ([ProdIssueDetId]),
	CONSTRAINT UC_ProductionIssDet UNIQUE ([ProdIssueId],[itemid],[colorid],[sizeid]),
	CONSTRAINT [FK_ProdissmasRefid] FOREIGN KEY ([ProdIssueId]) REFERENCES [Prod_iss_mas]([ProdIssueId]),
	CONSTRAINT [FK_ProdissdetcolorRefid] FOREIGN KEY ([colorid]) REFERENCES [Color]([ColorId]),
	CONSTRAINT [FK_ProdissdetitemRefid] FOREIGN KEY ([itemid]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_ProdissuomRefid] FOREIGN KEY ([OutputUom]) REFERENCES [Unit_of_measurement]([uomid]),
	CONSTRAINT [FK_ProdissdetsizeRefid] FOREIGN KEY ([sizeid]) REFERENCES [Size]([SizeId]),

)
