CREATE TABLE [dbo].[Job_Inv_Mas]
(
	[Job_InvId] [int] IDENTITY(1,1) NOT NULL,
	[Job_Inv_No] [varchar](20) NOT NULL,
	[Sup_Inv_No] [varchar](25) NOT NULL,
	[Job_Inv_Date] [datetime] NOT NULL,
	[Sup_Inv_Date] [datetime] NOT NULL,
	[SupplierId] [int] NOT NULL,
	[Unit_or_Other] [varchar](1) NOT NULL DEFAULT ('P'),
	[Passed] [int] NOT NULL DEFAULT (0),
	[Remarks] [varchar](250) NULL,
	[Gross_Amount] [numeric](15, 5) NOT NULL DEFAULT (0),
	[Addless_Amount] [numeric](15, 5) NOT NULL DEFAULT (0),
	[Invoice_value] [numeric](15, 5) NOT NULL DEFAULT (0),
	[Payment_Amt] [numeric](15, 5) NOT NULL DEFAULT (0),
	[CreatedBy] [int] NULL, 
    CONSTRAINT [PK_Job_Inv_Mas] PRIMARY KEY ([Job_InvId]), 
    CONSTRAINT [FK_Job_Inv_Mas_Employee] FOREIGN KEY ([Createdby]) REFERENCES [Employee]([EmployeeId]), 
    CONSTRAINT [CK_Job_Inv_Mas_unit_or_other] CHECK (([unit_or_other] = 'P' or [unit_or_other] = 'S')),
	CONSTRAINT [CK_Job_Inv_Mas_Passed] CHECK (([Passed] = 1 or [Passed] = 0))
	)
