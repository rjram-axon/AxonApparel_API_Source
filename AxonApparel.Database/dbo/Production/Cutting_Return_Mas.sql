CREATE TABLE [dbo].[Cutting_Return_Mas]
(
	[CuttingReturnId] INT IDENTITY(1,1) NOT NULL,
	[CuttingIssueId] [int] NULL,
	[CuttingOrdid] [int] NULL,
	[CuttingReturnNo] [varchar](20) NOT NULL,
	[CuttingReturnDate] [datetime] NULL,
	[Remarks] [varchar](1500) NULL Default(''),
	[ToLocation] [int] NULL,
	[RetLocType] [char](1) NOT NULL,
	[CreatedBy] [int] NULL,
	CONSTRAINT [PK_CuttinReturnMasid] PRIMARY KEY ([CuttingReturnId]),
	CONSTRAINT [FK_CuttingOrdeId] FOREIGN KEY ([CuttingOrdid]) REFERENCES [Cutting_Order_Mas]([CuttingOrdid]),
	CONSTRAINT [FK_CuttingReturnEmployId] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [Chk_Cutting_Return_Mas_RetLocType] CHECK  (([RetLocType] = 'W' or [RetLocType] = 'U' or [RetLocType] = 'S')),
)
