CREATE TABLE [dbo].[BillEntry]
(
	[BillID] [int] IDENTITY(1,1) NOT NULL primary key,
	[CompanyID] [int] NULL,
	[BillNo] [varchar](20) NOT NULL,
	[BillDate] [datetime] NULL,
	[SupBillNo] [varchar](50) NULL,
	[SupBillDate] [datetime] NULL,
	[SupplierID] [int] NULL,
	[Pur_Type] [varchar](2) NOT NULL,
	[Order_Type] [char](1) NOT NULL,
	[Amount] [numeric](14, 3) NOT NULL,
	[CurrencyID] [int] NULL,
	[ExchangeRate] [numeric](14, 3) NULL,
	[Remarks] [varchar](1000) NULL,
	[IsInvoiced] [char](1) NULL,
	[InvoiceNo] [varchar](18) NULL,
	[department] [varchar](20) NULL,

	CONSTRAINT [FK_BillEntry_CompanyID] FOREIGN KEY([CompanyID]) REFERENCES [dbo].[Company] ([CompanyId]),
	CONSTRAINT [FK_BillEntry_CurrencyID] FOREIGN KEY([CurrencyID]) REFERENCES [dbo].[Currency] ([CurrencyId]),
	CONSTRAINT [FK_BillEntry_SupplierID] FOREIGN KEY([SupplierID]) REFERENCES [dbo].[Supplier] ([SupplierId])
)
