﻿CREATE TABLE [dbo].[Prod_Ord_Det]
(
	[ProductionDetId] INT IDENTITY(1,1) NOT NULL,
	[ProductionId] [int] NULL,
	[itemid] [int] NULL,
	[colorid] [int] NULL,
	[sizeid] [int] NULL,
	[inp_op] [varchar](1) NULL,
	[order_output_qty] [numeric](14, 3) NOT NULL Default('0.000'),
	[issued_qty] [numeric](14, 3) NOT NULL Default('0.000'),
	[rate] [numeric](15, 5) NULL,
	[received_qty] [numeric](14, 3) NOT NULL Default('0.000'),
	[Return_Qty] [numeric](14, 3) NULL Default('0.000'),
	[Damage_qty] [numeric](14, 3) NULL Default('0.000'),
	[Cancel_Qty] [numeric](14, 3) NULL Default('0.000'),
	[Returnable_Qty] [numeric](14, 3) NULL,
	[Inp_CancelQty] [numeric](14, 3) NULL,
	[Markup_Rate] [numeric](15, 5) NULL,
	[Markup_Value] [numeric](15, 5) NULL,
	[PlannedSizeID] [int] NULL,
	[OrdSecQty] [numeric](14, 3) NOT NULL Default('0'),
	[ItemRemarks] [varchar](200) NOT NULL Default(''),
	[Loss_Qty] [numeric](14, 3) NULL Default('0'),
	[IN_OUT_UOMID] [int] NULL,
	[IssueSizeID] [int] NULL,
	[ReqDate] [datetime] NULL,
	[Loop_Len] [varchar](100) NULL,
	[Gauge] [varchar](100) NULL,
	CONSTRAINT [PK_ProductionDetid] PRIMARY KEY ([ProductionDetId]),
	CONSTRAINT [FK_ProdOrdMasRefid] FOREIGN KEY ([IN_OUT_UOMID]) REFERENCES [Prod_Ord_Mas]([ProductionId]),
	CONSTRAINT UC_Production UNIQUE ([ProductionId],[itemid],[colorid],[sizeid],[inp_op]),
	CONSTRAINT [FK_ProdOrdDetUomRefid] FOREIGN KEY ([IN_OUT_UOMID]) REFERENCES Unit_of_measurement(UomId),
	CONSTRAINT [FK_ProdOrdDetIssueSizeRefid] FOREIGN KEY ([IssueSizeID]) REFERENCES Size(SizeId),
	CONSTRAINT [FK_ProdOrdDetIssueColorRefid] FOREIGN KEY ([colorid]) REFERENCES Color(ColorId),
	CONSTRAINT [FK_ProdOrdDetIssueItemRefid] FOREIGN KEY ([itemid]) REFERENCES Item(ItemId),
	CONSTRAINT [FK_ProdOrdDetPlannedSizeRefid] FOREIGN KEY ([PlannedSizeID]) REFERENCES Size(SizeId),
	CONSTRAINT [FK_ProdOrdDetSizeRefid] FOREIGN KEY ([sizeid]) REFERENCES Size(SizeId),
	CONSTRAINT [FK_ProdOrdDetinpoutconst] CHECK  (([inp_op] = 'I' or [inp_op] = 'O' )),

)
