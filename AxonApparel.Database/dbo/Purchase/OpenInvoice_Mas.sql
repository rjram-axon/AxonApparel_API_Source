CREATE TABLE [dbo].[OpenInvoice_Mas]
(
	[Open_InvID] [int] IDENTITY(1,1) NOT NULL primary key,
	[CompanyID] [int] NULL,
	[Company_UnitID] [int] NULL,
	[EntryNo] [varchar](20) NULL,
	[InvoiceNo] [varchar](18) NOT NULL,
	[InvoiceDate] [datetime] NULL,
	[EntryDate] [datetime] NULL,
	[SupplierID] [int] NULL,
	[Order_Type] [char](1) NOT NULL,
	[Gross_amount] [numeric](15, 5) NULL,
	[Addless_amount] [numeric](15, 5) NULL,
	[AddLessManualOrFormula] [varchar](1) NOT NULL,
	[CurrencyID] [int] NULL,
	[ExchangeRate] [numeric](14, 3) NULL,
	[Remarks] [varchar](1000) NULL,
	[Payment_Amt] [numeric](18, 3) NULL,
	[paid] [bit] NULL,
	[passed] [int] NULL,

	CONSTRAINT [FK_OpenInvoice_Mas_Company_UnitID] FOREIGN KEY([Company_UnitID]) REFERENCES [dbo].[CompanyUnit] ([Id]),
	CONSTRAINT [FK_OpenInvoice_Mas_CompanyID] FOREIGN KEY([CompanyID]) REFERENCES [dbo].[Company] ([CompanyId]),
	CONSTRAINT [FK_OpenInvoice_Mas_CurrencyID] FOREIGN KEY([CurrencyID]) REFERENCES [dbo].[Currency] ([CurrencyId]),
	 CONSTRAINT [FK_OpenInvoice_Mas_SupplierID] FOREIGN KEY([SupplierID]) REFERENCES [dbo].[Supplier] ([SupplierId]),

)
