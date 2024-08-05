CREATE TABLE [dbo].[LineAllocationDet]
(
	[LDetid] INT IDENTITY(1,1) NOT NULL,
	[LMasid] [int] NULL,
	[LineType] [char](1) NULL,
	[LineId] [int] NULL,
	[OrgLineNo] [varchar](50) NOT NULL,
	[WDivisionid] [int] NULL,
	[InchargeId] [int] NULL,
	[lTime] [datetime] NULL,
	CONSTRAINT [PK_LineAllocationDetid] PRIMARY KEY ([LDetid]),
	CONSTRAINT [FK_LineAllocationInchargeId] FOREIGN KEY ([InchargeId]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_LineAllocatioMasRefId] FOREIGN KEY ([LMasid]) REFERENCES [LineAllocationMas]([LMasid]),
	CONSTRAINT [FK_LineAllocatioWrkDivRefId] FOREIGN KEY ([WDivisionid]) REFERENCES [WorkDivision]([WorkDivisionId]),
)
