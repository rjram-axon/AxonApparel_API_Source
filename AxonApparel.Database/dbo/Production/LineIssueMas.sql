CREATE TABLE [dbo].[LineIssueMas]
(
	[IssueId] INT IDENTITY(1,1) NOT NULL,
	[IssueNo] [varchar](20) NOT NULL,
	[IssueDate] [datetime] NULL,
	[CompanyId] [int] NOT NULL,
	[CompanyunitID] [int] NOT NULL,
	[JobNo] [varchar](20) NOT NULL,
	[LineID] [int] NOT NULL,
	[Job_Work_sample] [varchar](1) NOT NULL,
	[ProgramNo] [varchar](20) NOT NULL,
	[Remarks] [varchar](500) NOT NULL Default(''),
	[GatePassVehicle] [varchar](15) NOT NULL Default(''),
	[FromStoreid] [int] NULL,
	[CreatedBy] [int] NULL,
	CONSTRAINT [PK_LineIssueMasid] PRIMARY KEY ([IssueId]),
	CONSTRAINT [FK_LineIssuecreatedId] FOREIGN KEY (CreatedBy) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_LineIssueStoreUnitId] FOREIGN KEY ([FromStoreid]) REFERENCES [StoreUnit]([StoreUnitID]),
	CONSTRAINT [FK_LineIssueCompanyId] FOREIGN KEY ([CompanyId]) REFERENCES Company(CompanyId),
	CONSTRAINT [FK_LineIssueLineAllocationDetId] FOREIGN KEY ([LineID]) REFERENCES LineAllocationDet([LDetid]),
	CONSTRAINT [FK_LineIssueCompanyUnitId] FOREIGN KEY ([CompanyunitID]) REFERENCES Companyunit(Id),
	

)
