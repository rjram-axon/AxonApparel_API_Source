CREATE TABLE [dbo].[DebitOrderDetail]
(
	[Debit_Orddetid] INT IDENTITY(1,1) NOT NULL, 
    [Debit_detid] [int] NULL,
	[OrderNo] [varchar](20) NULL,
	[Styleid] [int] NULL,
	[DebitQty] [numeric](14, 3) NULL,
	[Rate] [numeric](14, 2) NULL,
	[Amount] [numeric](14, 2) NULL,
	[Debit_id] [int] NULL, 
	[ItemID] [int] NULL,
	[SizeID] [int] NULL,
	[ColorID] [int] NULL,
	[UOMId] [int] NULL,
    CONSTRAINT [PK_DebitOrderDetail] PRIMARY KEY ([Debit_Orddetid]), 
    CONSTRAINT [FK_DebitOrderDetail_pur_debit_Itemdet] FOREIGN KEY ([Debit_detid]) REFERENCES [pur_debit_Itemdet]([Debit_detid]),
	CONSTRAINT [FK_DebitOrderDetail_pur_debit_mas] FOREIGN KEY ([Debit_id]) REFERENCES [pur_debit_mas]([Debit_id]), 
    CONSTRAINT [FK_DebitOrderDetail_StyleHeader] FOREIGN KEY ([Styleid]) REFERENCES [StyleHeader]([Styleid]),
	CONSTRAINT [FK_DebitOrderDetail_Color] FOREIGN KEY ([ColorID]) REFERENCES [Color]([ColorId]), 	
	CONSTRAINT [FK_DebitOrderDetail_Size] FOREIGN KEY ([SizeID]) REFERENCES [Size]([SizeId]), 
	CONSTRAINT [FK_DebitOrderDetail_Item] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]), 
	CONSTRAINT [FK_DebitOrderDetail_UomId] FOREIGN KEY ([UOMid]) REFERENCES [Unit_of_measurement]([uomid])
)
