CREATE TABLE [dbo].[ProdReturnDet]
(
	ReturnDetID INT IDENTITY(1,1) NOT NULL,
	[ReturnID] [int] NULL,
	[ItemId] [int] NOT NULL,
	[ColorId] [int] NOT NULL,
	[SizeId] [int] NOT NULL,
	[IssueStockID] [int] NOT NULL,
	[ReturnQty] [numeric](12, 3) NOT NULL,
	[LossQty] [numeric](12, 3) NOT NULL Default(0),
	[NewStockID] [int] NULL,
	[Bundled] [varchar](1) NOT NULL Default('N'),
	[CuttingId] [int] NULL,
	[ProdPrgNo] [varchar](20) NULL,
	[lotNo] [varchar](20) NULL Default(''),
	[BundleNo] [varchar](12) NULL Default(''),
	[IssueDetID] [int] NULL,
	CONSTRAINT [PK_ProdReturnDetRefid] PRIMARY KEY (ReturnDetID),
	CONSTRAINT [FK_ProdRetDetProdIssueDetRefid] FOREIGN KEY ([IssueDetID]) REFERENCES Prod_iss_det(ProdIssueDetId),
	CONSTRAINT [FK_ProdRetCuttingMasRefid] FOREIGN KEY ([CuttingId]) REFERENCES Cutting_Order_Mas(CuttingOrdid),
	--CONSTRAINT [FK_ProdReturnProdPrgMasRefid] FOREIGN KEY ([ProdPrgNo]) REFERENCES [Prod_prg_Mas]([Prodprgno]),

)
