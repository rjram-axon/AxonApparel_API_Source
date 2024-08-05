CREATE TABLE [dbo].[Op_Stock]
(
	OpStkId int IDENTITY(1,1) NOT NULL primary key,
	[Companyid] [int] NULL,
	[Stockid] [int] NULL,
	[Op_Stock_No] [varchar](20) NULL,
	[Remarks] [varchar](1000) NULL,
	[StoreUnitID] [int] NULL,
	[CreatedBy] [int] NULL,

	CONSTRAINT [PK_Storeunitid]  FOREIGN KEY([StoreUnitID]) REFERENCES [dbo].[StoreUnit] ([StoreUnitID]),
	CONSTRAINT [FK_Op_Stock_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),

)
