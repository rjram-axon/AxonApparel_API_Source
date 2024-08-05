CREATE TABLE [dbo].[Process_Issue_Jobdet]
(
	[ProcessIssueJobId] [int] IDENTITY(1,1) NOT NULL primary key,
	[ProcessIssueId] [int] NULL,
	[ProcessIssueDetId] [int] NULL,
	[Job_ord_no] [varchar](20) NOT NULL,
	[ProdPrgNo] [varchar](20) NOT NULL,
	[LastProcessid] [int] NULL,
	[IssueQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[ReturnQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[LossQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[SecQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[itemid] [int] NULL,
	[colorid] [int] NULL,
	[sizeid] [int] NULL,
	ip_op varchar(1) null,
	[PlannedSizeID] [int] NULL,
	OpItemId int null,
	OpColorId int null,
	OpSizeId int null,
	CONSTRAINT [FK_prod_iss_det_ProcessIssueIdde] FOREIGN KEY([ProcessIssueId]) REFERENCES [dbo].[Process_Issue_Mas] ([ProcessIssueId]),
	CONSTRAINT [FK_prod_iss_det_ProcessIssueDetId] FOREIGN KEY([ProcessIssueDetId]) REFERENCES [dbo].[Process_Issue_Det] ([ProcessIssueDetId]),
	
)
