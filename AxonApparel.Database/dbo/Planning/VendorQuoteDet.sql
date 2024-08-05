CREATE TABLE [dbo].[VendorQuoteDet]
(		
	[QuoteDetid] [int] IDENTITY(1,1) NOT NULL,
	[Quoteid] [int] NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[Uomid] [int] NULL,
	[Quantity] [numeric](7, 3) NULL,
	[Rate] [numeric](15, 5) NOT NULL,
	[MinQty] [numeric](14, 3) NULL,
	[Apprate] [numeric](15, 5) NOT NULL DEFAULT (0),
	[AppDate] [datetime] NULL,
	[Buy_ord_no] [varchar](20) NULL DEFAULT (''),
	[Buy_Ord_MasId] [int] Null,
	[ApprovedBy] [int] NULL,
	[MaxQty] [numeric](14, 3) NULL
    CONSTRAINT [PK_VendorQuoteDet] PRIMARY KEY ([QuoteDetid]), 
	CONSTRAINT [FK_VendorQuoteDet_Item] FOREIGN KEY ([Itemid]) REFERENCES [Item]([Itemid]),
	CONSTRAINT [FK_VendorQuoteDet_Color] FOREIGN KEY ([Colorid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [FK_VendorQuoteDet_Size] FOREIGN KEY ([Sizeid]) REFERENCES [Size]([Sizeid]),
	CONSTRAINT [FK_VendorQuoteDet_Uom] FOREIGN KEY ([Uomid]) REFERENCES [Unit_of_measurement]([Uomid]),
    CONSTRAINT [FK_VendorQuoteDet_Employee] FOREIGN KEY ([ApprovedBy]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_VendorQuoteDet_Buy_Ord_Mas] FOREIGN KEY ([Buy_Ord_MasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId]),
	CONSTRAINT [FK_VendorQuoteDet_VenderQuoteMas] FOREIGN KEY ([Quoteid]) REFERENCES [VendorQuoteMas]([Quoteid])
)
