CREATE TABLE [dbo].[Production_Recpt_Return]
(
	[Production_Recpt_Retid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Production_Recpt_masid] [int] NULL,
	[LotNo] [varchar](20) NULL,
	[ProcessOrdId] [int] NULL,
	[Prod_Iss_Stockid] [int] NULL,
	[Returnqty] [numeric](14, 3) NOT NULL,
	[LossQty] [numeric](14, 3) NOT NULL,
	[ProcessJobDetid] [int] NULL,
	[ProdIssueJobId] [int] NULL,
	[CreatedBy] [int] NULL,

	CONSTRAINT [FK_Prod_Recpt_Ret_ProcessOrdId] FOREIGN KEY([ProcessOrdId]) REFERENCES [dbo].[Production_ord_mas] ([productionordid]),
	CONSTRAINT [FK_Prod_Recpt_Ret_ProdIssueJobId] FOREIGN KEY([ProdIssueJobId]) REFERENCES [dbo].[Prod_iss_JobDet] ([ProdIssueJobId])
)
