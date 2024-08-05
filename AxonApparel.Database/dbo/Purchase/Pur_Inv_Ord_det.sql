CREATE TABLE [dbo].[Pur_Inv_Ord_det]
(
	[Pur_Inv_Ord_DetID] INT IDENTITY(1,1) NOT NULL, 
	[Order_No] [varchar](20) NOT NULL,
	[Pur_invID] [int] NULL,
	[Pur_Inv_DetID] [int] NULL,
	[InvoiceQty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[StyleID] [int] NULL,
    CONSTRAINT [PK_Pur_Inv_Ord_det] PRIMARY KEY ([Pur_Inv_Ord_DetID]), 
    CONSTRAINT [FK_Pur_Inv_Ord_det_StyleHeader] FOREIGN KEY ([StyleId]) REFERENCES [StyleHeader]([StyleId])
)
