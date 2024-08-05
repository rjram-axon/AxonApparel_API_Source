CREATE TABLE [dbo].[Process_Quote_Det]
(
	[Process_Quote_detid] [int] IDENTITY(1,1) NOT NULL, 
	[Process_Quoteid] [int] NULL,
	[Process_QuoteProid] [int] NULL,
	[Itemid] [int] NULL,
	[colorid] [int] NULL,
	[sizeid] [int] NULL,
	[uomid] [int] NULL,
	[rate] [numeric](15, 5) NOT NULL DEFAULT (0),
	[MinQty] [numeric](7, 3) NOT NULL DEFAULT (0),
	[AppRate] [numeric](15, 5) NOT NULL DEFAULT (0),
	[PsNo][int]null,
    CONSTRAINT [PK_Process_Quote_Det] PRIMARY KEY ([Process_Quote_detid]), 
    CONSTRAINT [FK_Process_Quote_Det_Process_Quote] FOREIGN KEY ([Process_Quoteid]) REFERENCES [Process_Quote]([Process_Quoteid]),
	CONSTRAINT [FK_Process_Quote_Det_Process_QuotePro] FOREIGN KEY ([Process_QuoteProid]) REFERENCES [Process_QuotePro]([Process_QuoteProid]),
	CONSTRAINT [FK_Process_Quote_Det_Item] FOREIGN KEY ([Itemid]) REFERENCES [Item]([Itemid]),
	CONSTRAINT [FK_Process_Quote_Det_Color] FOREIGN KEY ([Colorid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_Process_Quote_Det_size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid]),
	CONSTRAINT [FK_Process_Quote_Det_Uom] FOREIGN KEY ([uomid]) REFERENCES [Unit_Of_Measurement]([UomId])
)
