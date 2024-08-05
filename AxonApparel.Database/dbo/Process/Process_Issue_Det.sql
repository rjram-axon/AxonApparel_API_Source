CREATE TABLE [dbo].[Process_Issue_Det]
(
	[ProcessIssueDetId] [int] IDENTITY(1,1) NOT NULL primary key,
	[ProcessIssueId] [int] NULL,
	[itemid] [int] NULL,
	[colorid] [int] NULL,
	[sizeid] [int] NULL,
	[IssueQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[SecQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[OutputUom] [int] NULL,
	[OutputValue] [numeric](15, 5) NULL DEFAULT (0),
	[IPMarkup_Rate] [numeric](15, 5) NULL DEFAULT (0),
	ip_op varchar(1) null,
	[PlannedSizeID] [int] NULL,
	OpItemId int null,
	OpColorId int null,
	OpSizeId int null,
	CONSTRAINT [FK_prod_iss_det_ProcessIssueId] FOREIGN KEY([ProcessIssueId]) REFERENCES [dbo].[Process_Issue_Mas] ([ProcessIssueId]),
	CONSTRAINT [FK_prod_iss_det_colorid] FOREIGN KEY([colorid]) REFERENCES [dbo].[color] ([colorid]),
	CONSTRAINT [FK_prod_iss_det_itemId] FOREIGN KEY([itemid]) REFERENCES [dbo].[Item] ([itemid]),
	 CONSTRAINT [FK_Prod_iss_det_OutputUom] FOREIGN KEY([OutputUom]) REFERENCES [dbo].[Unit_of_measurement] ([uomid]),
	  CONSTRAINT [FK_prod_iss_det_sizeid] FOREIGN KEY([sizeid]) REFERENCES [dbo].[size] ([sizeid]),

	)
