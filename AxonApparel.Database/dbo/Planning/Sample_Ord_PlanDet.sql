CREATE TABLE [dbo].[Sample_Ord_PlanDet]
(
	[SPlanid] [int] NULL,
	[SPlanDetid] [int] IDENTITY(1,1) NOT NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[UOMid] [int] NULL,
	[Quantity] [numeric](14, 3) NOT NULL DEFAULT (0),
	[App_Qty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[Issued_Qty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[ItemRemarks] [varchar](250) NULL,
	[PurUomid] [int] NULL,
	[BOMQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[ToPurUOM] [numeric](8, 0) NULL,
	[OCNClose] [bit] NULL, 
    CONSTRAINT [PK_Sample_Ord_PlanDet] PRIMARY KEY ([SPlanDetid]), 
    CONSTRAINT [FK_Sample_Ord_PlanDet_Color] FOREIGN KEY ([Colorid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_Sample_Ord_PlanDet_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid]),
	CONSTRAINT [FK_Sample_Ord_PlanDet_Uom] FOREIGN KEY ([UOMid]) REFERENCES [Unit_of_measurement]([UOMid]),
	CONSTRAINT [FK_Sample_Ord_PlanDet_PUom] FOREIGN KEY ([PurUomid]) REFERENCES [Unit_of_measurement]([UOMid]),
	CONSTRAINT [FK_Sample_Ord_PlanDet_Sample_Ord_PlanMas] FOREIGN KEY ([SPlanid]) REFERENCES [Sample_Ord_PlanMas]([SPlanid])
)
