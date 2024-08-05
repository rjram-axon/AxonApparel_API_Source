CREATE TABLE [dbo].[Cutting_Issue_Mas]
(
	[CuttingIssueId] INT IDENTITY(1,1) NOT NULL, 
    [CuttingOrdid] INT NULL, 
    [CuttingIssueNo] VARCHAR(20) NOT NULL,
	[CuttingIssueDate] [datetime] NULL,
	[VehicleNo] [varchar](20) NULL,
	[Remarks] [varchar](100) NULL,
	[FromStoreid] [int] NULL,
	[CreatedBy] [int] NULL,
	[FLineId] [int] NULL,
	[IsApproved] [bit] NULL,
	[ApprovedBy] [int] NULL,
	[ApprovedDate] [datetime] NULL,
	CONSTRAINT [PK_CuttinIssueid] PRIMARY KEY ([CuttingIssueId]),	
	CONSTRAINT [FK_CuttingMasId] FOREIGN KEY ([CuttingOrdid]) REFERENCES [Cutting_Order_Mas]([CuttingOrdid]),
	CONSTRAINT [FK_CuttingIssueEmploId] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_CuttingIssueStoreId] FOREIGN KEY ([FromStoreid]) REFERENCES [StoreUnit](StoreunitId),
)
