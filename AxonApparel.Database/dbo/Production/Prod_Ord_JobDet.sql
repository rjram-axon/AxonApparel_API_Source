CREATE TABLE [dbo].[Prod_Ord_JobDet]
(
	ProcessJobDetid INT IDENTITY(1,1) NOT NULL,
	[ProdOrdid] [int] NULL,
	[ProdOrddetid] [int] NULL,
	[ProgQty] [numeric](14, 3) NULL Default('0.000'),
	[OrderQty] [numeric](14, 3) NULL Default('0.000'),
	[issued_qty] [numeric](14, 3) NOT NULL Default('0.000'),
	[received_qty] [numeric](14, 3) NOT NULL Default('0.000'),
	[Return_Qty] [numeric](14, 3) NULL Default('0.000'),
	[Damage_qty] [numeric](14, 3) NULL Default('0.000'),
	[Cancel_Qty] [numeric](14, 3) NULL Default('0.000'),
	[Job_ord_no] [varchar](20) NULL,
	[ProdPrgNo] [varchar](20) NULL,
	[Returnable_Qty] [numeric](14, 3) NULL,
	[Closed] [bit] NULL,
	[Inp_CancelQty] [numeric](14, 3) NULL,
	[OrdSecQty] [numeric](14, 3) NOT NULL Default(0),
	[Loss_Qty] [numeric](14, 3) NULL Default('0.000'),
	[buy_ord_ship] [varchar](8) NULL Default(0),

	CONSTRAINT [PK_ProductionJobDetid] PRIMARY KEY ([ProcessJobDetid]),
	CONSTRAINT UC_ProductionOrdJobDet UNIQUE ([ProdOrdid],[ProdOrddetid],[Job_ord_no],[ProdPrgNo]),
	CONSTRAINT [FK_ProdOrdDetJobOrdDetRefid] FOREIGN KEY ([ProdOrddetid]) REFERENCES [Prod_Ord_Det]([ProductionDetId]),
	CONSTRAINT [FK_ProdOrdMasJobOrdDetRefid] FOREIGN KEY ([ProdOrdid]) REFERENCES [Prod_ord_mas]([ProductionId]),

)
