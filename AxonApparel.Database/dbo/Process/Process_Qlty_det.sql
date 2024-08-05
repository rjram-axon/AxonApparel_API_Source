CREATE TABLE [dbo].[Process_Qlty_det]
(
	[Proc_qlty_Masid] [int] NULL,
	[Proc_Qlty_detid] [int] IDENTITY(1,1) NOT NULL,
	[itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[uomid] [int] NULL,
	[DebitQty] [numeric](12, 3) NULL DEFAULT (0.00),
	[AcptQty] [numeric](12, 3) NULL DEFAULT (0.00),
	[Rate] [numeric](10, 2) NULL DEFAULT (0.00),
	[Amount] [numeric](10, 2) NULL DEFAULT (0.00),
	[Prod_Recpt_detid] [int] NULL,
	[Prod_Recpt_jobdetid] [int] NULL,
	[Debit_Rate] [numeric](9, 0) NULL,
	[ReProQty] [numeric](12, 3) NULL DEFAULT (0), 
    CONSTRAINT [PK_Process_Qlty_det] PRIMARY KEY ([Proc_Qlty_detid]), 
    CONSTRAINT [FK_Process_Qlty_det_Process_Qlty_mas] FOREIGN KEY ([Proc_qlty_Masid]) REFERENCES [Process_Qlty_mas]([Proc_qlty_Masid]),
	CONSTRAINT [FK_Process_Qlty_det_Item] FOREIGN KEY ([Itemid]) REFERENCES [Item]([itemid]),
	CONSTRAINT [FK_Process_Qlty_det_Color] FOREIGN KEY ([Colorid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_Process_Qlty_det_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid]),
	CONSTRAINT [FK_Process_Qlty_det_Uom] FOREIGN KEY ([Uomid]) REFERENCES [Unit_of_measurement]([Uomid])
)
