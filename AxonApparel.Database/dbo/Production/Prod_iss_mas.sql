CREATE TABLE [dbo].[Prod_iss_mas]
(
	[ProdIssueId] INT IDENTITY(1,1) NOT NULL,
	[ProdIssueNo] [varchar](20) NULL,
	[ProdIssueDate] [datetime] NULL,
	[ProductionOrdId] [int] NULL,
	[Remarks] [varchar](1500) NULL,
	[GatePassVehicle] [varchar](15) NULL,
	[IssueStoreid] [int] NULL,
	[CreatedBy] [int] NULL,
	[ProcessorId] INT NULL,
	ProgramNo varchar(20) NULL,
	InternalOrExternal char(1) NULL,
    [ProcessId] INT NULL, 
    [OrderType] VARCHAR(2) NULL, 
    [CompanyUnitId] INT NULL, 
    [CompanyId] INT NULL,
	Closed char(1) NULL Default('N'), 
    [LastProcessId] INT NULL, 
    CONSTRAINT [PK_ProductionIssid] PRIMARY KEY ([ProdIssueId]),
	--CONSTRAINT [FK_ProductionIssMasRefid] FOREIGN KEY (ProductionOrdId) REFERENCES [Prod_Ord_Mas]([ProductionId]),
	CONSTRAINT [FK_ProdIssEmployeeRefid] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_ProdIssIssueStoreRefid] FOREIGN KEY ([IssueStoreid]) REFERENCES [StoreUnit]([StoreunitId])
)
