CREATE TABLE [dbo].[GenIssueMas]
(
		[IssueId] [int] IDENTITY(1,1) NOT NULL primary key,
	[IssueNo] [varchar](20) NOT NULL,
	[IssueDate] [datetime] NOT NULL,
	[CompanyID] [int] NOT NULL,
	[UnitType] [varchar](1) NOT NULL,
	[UnitId] [int] NOT NULL,
	[InvoiceType] [varchar](1) NOT NULL,
	[Remarks] [varchar](500) NULL,
	[GrossAmount] [numeric](12, 2) NOT NULL,
	[NetAmount] [numeric](12, 2) NOT NULL,
	[IssueOrRecpt] [char](1) NOT NULL DEFAULT ('I'),
	[Processid] [int] NULL,
	[VehicleNo] [varchar](50) NOT NULL DEFAULT (''),
	[RequestnerId] [int] NULL,
	[storeunitid] [int] NULL DEFAULT (null),
	[CreatedBy] [int] NULL,
	[ToDiviid] [int] NULL,
	[ReqNo] [varchar](20),

	CONSTRAINT [FK_GenIssueMas_Processid] FOREIGN KEY([Processid]) REFERENCES [dbo].[Process] ([ProcessId]),
	CONSTRAINT [FK_GenIssueMas_RequestnerId] FOREIGN KEY([RequestnerId]) REFERENCES [dbo].[Employee] ([EmployeeId]),
	CONSTRAINT [FK_GenIssueMas_storeunitid] FOREIGN KEY([storeunitid]) REFERENCES [dbo].[StoreUnit] ([StoreUnitID]),
	CONSTRAINT [FK_GenIssueMas_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),

)
