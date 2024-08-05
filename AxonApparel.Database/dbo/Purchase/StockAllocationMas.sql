CREATE TABLE [dbo].[StockAllocationMas]
(
	[AllocationID] [int] IDENTITY(1,1) NOT NULL primary key,
	[AllocationNo] [varchar](20) NOT NULL,
	[AllocationRefNo] [varchar](20) NOT NULL DEFAULT (''),
	[AllocationDate] [datetime] NOT NULL DEFAULT (getdate()),
	[CompanyID] [int] NOT NULL,
	[SubStoreID] [int] NOT NULL,
	[StockType] [varchar](1) NOT NULL  CHECK  (([StockType] = 'B' or [StockType] = 'O' or [StockType] = 'G')),
	[OrderType] [varchar](1) NULL CHECK  (([OrderType] = 'B' or [OrderType] = 'S' or [OrderType] = 'J')),
	[CreatedBy] [int] NULL,

	CONSTRAINT [fk_stkalloc_cmpid] FOREIGN KEY([CompanyID]) REFERENCES [dbo].[company] ([companyid]),
	CONSTRAINT [fk_stkalloc_strunitid] FOREIGN KEY([SubStoreID]) REFERENCES [dbo].[StoreUnit] ([StoreUnitID])
)
