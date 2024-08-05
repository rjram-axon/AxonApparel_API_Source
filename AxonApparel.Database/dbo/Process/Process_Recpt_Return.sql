CREATE TABLE [dbo].[Process_Recpt_Return]
(
	[Process_Recpt_Retid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Process_Recpt_masid] [int] NULL,
	[LotNo] [varchar](20) NULL,
	[ProcessOrdId] [int] NULL,
	[Proc_Iss_Stockid] [int] NULL,
	[Returnqty] [numeric](14, 3) NOT NULL,
	[LossQty] [numeric](14, 3) NOT NULL,
	[ProcessJobDetid] [int] NULL,
	[ProcIssueJobId] [int] NULL,
	[CreatedBy] [int] NULL,

	CONSTRAINT [FK_Proc_Recpt_Ret_ProcessOrdId] FOREIGN KEY([ProcessOrdId]) REFERENCES [dbo].[Process_ord_mas] ([processordid]),
	CONSTRAINT [FK_Proc_Recpt_Ret_ProdIssueJobId] FOREIGN KEY([ProcIssueJobId]) REFERENCES [dbo].[Prod_iss_JobDet] ([ProdIssueJobId]),
	CONSTRAINT [FK_Proc_Recpt_Prod_Recpt_Masid] FOREIGN KEY([Process_Recpt_masid]) REFERENCES [dbo].[Process_Recpt_Mas] ([proc_recpt_masid]),
)
