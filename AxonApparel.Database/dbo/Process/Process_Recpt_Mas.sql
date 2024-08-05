CREATE TABLE [dbo].[Process_Recpt_Mas]
(
	[proc_recpt_masid] [int] IDENTITY(1,1) NOT NULL primary key,
	[proc_recpt_no] [varchar](20) NULL,
	[proc_recpt_date] [datetime] NULL,
	[Recpt_Ref_no] [varchar](25) NULL,
	[Recpt_Ref_date] [datetime] NULL,
	[remarks] [varchar](2000) NULL,
	[OrderType] [varchar](2) NULL CHECK  (([OrderType]='W' OR [OrderType]='J' OR [OrderType]='S' OR [OrderType]='G' OR [OrderType]='L')),
	[StoreUnitID] [int] NULL,
	[CreatedBy] [int] NULL,
	[InwardNo] [varchar](25) NULL,
	[SupplierInvoiceNo] [varchar](25) NULL,
	[ExcldetoInv] [bit] NULL,
	[InspNo] [varchar](100) NULL,
	[InspDate] [datetime] NULL,
	[EWayNo] [varchar](25) NULL,
	[EWayDate] [date] NULL,

	CONSTRAINT [FK_Proc_Recpt_mas_Storeunitid] FOREIGN KEY([StoreUnitID])REFERENCES [dbo].[StoreUnit] ([StoreUnitID]),
	CONSTRAINT [FK_Proc_Recpt_mas_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]))
