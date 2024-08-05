CREATE TABLE [dbo].[Production_Ord_JobDet]
(
[ProductionJobDetid] [int] IDENTITY(1,1) NOT NULL primary key,
	[ProductionOrdid] [int] NULL,
	[ProductionOrddetid] [int] NULL,
	[ProgQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[OrderQty] [numeric](14, 3) NULL DEFAULT (0.000),
	[issued_qty] [numeric](14, 3) NOT NULL DEFAULT (0.000),
	[received_qty] [numeric](14, 3) NOT NULL DEFAULT (0.000),
	[Return_Qty] [numeric](14, 3) NULL DEFAULT (0.000),
	[Damage_qty] [numeric](14, 3) NULL DEFAULT (0.000),
	[Cancel_Qty] [numeric](14, 3) NULL DEFAULT (0.000),
	[Job_ord_no] [varchar](20) NULL,
	[ProdPrgNo] [varchar](20) NULL,
	[Returnable_Qty] [numeric](14, 3) NULL,
	[Closed] [bit] NULL,
	[Inp_CancelQty] [numeric](14, 3) NULL,
	[OrdSecQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[Loss_Qty] [numeric](14, 3) NULL DEFAULT (0.000), 
	[buy_ord_ship] [varchar](8) NULL DEFAULT ('0'),
	Itemid int null,
	Colorid int null,
	Sizeid int null,
	ip_op varchar(1) null,
	
	CONSTRAINT [FK_Process_ord_jobdet_ordId] FOREIGN KEY([ProductionOrddetid]) REFERENCES [dbo].[Production_Ord_Det] ([productionorddetid]),
	CONSTRAINT [FK_Process_ord_jobdet_procordId] FOREIGN KEY([ProductionOrdid])REFERENCES [dbo].[Production_Ord_Mas] ([productionordid])
	)
