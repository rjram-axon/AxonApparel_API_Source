CREATE TABLE [dbo].[Pur_return_mas]
(
	[Return_ID] [int] IDENTITY(1,1) NOT NULL,
	[Return_no] [varchar](20) NULL,
	[Return_date] [datetime] NULL,
	[CompanyID] [int] NULL,
	[SupplierID] [int] NULL,
	[Remarks] [varchar](1500) NULL,
	[ReturnType] [char](1) NOT NULL DEFAULT ('O'),
	[storeid] [int] NULL DEFAULT (null),
	[PurOrGrn] [varchar](1) NULL DEFAULT ('G'),
	[PurOrGrnNo] [varchar](20) NULL,
	[CreatedBy] [int] NULL,
	[Ordtype] [varchar](1) NULL, 
    CONSTRAINT [PK_Pur_return_mas] PRIMARY KEY ([Return_ID]), 
    CONSTRAINT [FK_Pur_return_mas_company] FOREIGN KEY ([CompanyID]) REFERENCES [Company]([CompanyId]),
	CONSTRAINT [FK_Pur_return_mas_Employee] FOREIGN KEY ([CreatedBy]) REFERENCES [employee]([employeeid]),
    CONSTRAINT [FK_Pur_return_mas_Supplier] FOREIGN KEY ([SupplierID]) REFERENCES [supplier]([supplierid]), 
    CONSTRAINT [CK_Pur_return_mas_PurOrGrn] CHECK (([PurOrGrn] = 'G' or [PurOrGrn] = 'O')), 
    CONSTRAINT [CK_Pur_return_mas_ReturnType] CHECK (([ReturnType] = 'O' or [ReturnType] = 'G'))
)
