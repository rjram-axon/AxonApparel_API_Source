CREATE TABLE [dbo].[Prod_Recpt_Return]
(
	[Prod_Recpt_Retid] INT IDENTITY(1,1) NOT NULL,
	[Prod_Recpt_masid] [int] NULL,
	[LotNo] [varchar](20) NULL,
	[ProdIssId] [int] NULL,
	[Prod_Iss_Stockid] [int] NULL,
	[Returnqty] [numeric](14, 3) NOT NULL Default(0.000),
	[LossQty] [numeric](14, 3) NOT NULL Default(0.000),
	[ProcessJobDetid] [int] NULL,
	[ProdIssueJobId] [int] NULL,
	[CreatedBy] [int] NULL,
	[ReProcQty] [numeric](9, 3) NULL,
	[ProdPrgID] [int] NULL,

	CONSTRAINT [PK_ProdReturnid] PRIMARY KEY ([Prod_Recpt_Retid]),
	CONSTRAINT [FK_ProdreturnIssueIdRefid] FOREIGN KEY ([ProdIssId]) REFERENCES [Prod_iss_mas]([ProdIssueid]),
	CONSTRAINT [FK_ProdreturnIssueJobIdRefid] FOREIGN KEY ([ProdIssueJobId]) REFERENCES [Prod_iss_JobDet]([ProdIssueJobId]),
	CONSTRAINT [FK_ProdProgIdRefid] FOREIGN KEY ([ProdPrgID]) REFERENCES [Prod_prg_mas]([ProdPrgid]),
	CONSTRAINT [FK_ProdEmployeeIdRefid] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]),
)
