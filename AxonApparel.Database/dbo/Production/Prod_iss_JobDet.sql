CREATE TABLE [dbo].[Prod_iss_JobDet]
(
	[ProdIssueJobId] INT IDENTITY(1,1) NOT NULL,
	[ProdIssueId] [int] NULL,
	[ProdIssueDetId] [int] NULL,
	[Job_ord_no] [varchar](20) NOT NULL,
	[ProdPrgNo] [varchar](20) NOT NULL,
	[LastProcessid] [int] NULL,
	[IssueQty] [numeric](14, 3) NULL Default('0.000'),
	[ReturnQty] [numeric](14, 3) NOT NULL Default(0),
	[LossQty] [numeric](14, 3) NOT NULL Default(0),
	[SecQty] [numeric](14, 3) NOT NULL Default(0),

	[ItemId] INT NULL, 
    [ColorId] INT NULL , 
    [SizeId] INT NULL , 
    CONSTRAINT [PK_ProductionIssjobDetid] PRIMARY KEY ([ProdIssueJobId]),
	CONSTRAINT UC_ProductionIssJobDet UNIQUE ([ProdIssueId],[ProdIssueDetId],[Job_ord_no],[ProdPrgNo]),
	CONSTRAINT [FK_ProdissmasdetRefid] FOREIGN KEY ([ProdIssueId]) REFERENCES [Prod_iss_mas]([ProdIssueId]),
	CONSTRAINT [FK_ProdissdetRefid] FOREIGN KEY ([ProdIssueDetId]) REFERENCES [Prod_iss_det]([ProdIssueDetId]),
	--CONSTRAINT [FK_ProdissProcessRefid] FOREIGN KEY ([LastProcessid]) REFERENCES [process]([processid]),

)
