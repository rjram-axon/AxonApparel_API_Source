CREATE TABLE [dbo].[Process_Issue_Mas]
(
	[ProcessIssueId] [int] IDENTITY(1,1) NOT NULL primary key,
	[ProcessIssueNo] [varchar](20) NULL,
	[ProcessIssueDate] [datetime] NULL,
	[ProcessOrdId] [int] NULL,
	[Remarks] [varchar](1500) NULL,
	[GatePassVehicle] [varchar](15) NULL,
	[IssueStoreid] [int] NULL,
	[CreatedBy] [int] NULL,
	[EWayNo] [varchar](25) NULL,
	[EWayDate] [date] NULL,
	
	CONSTRAINT [Fk_Proces_iss_Mas_ProcessOrdId] FOREIGN KEY([ProcessOrdId]) REFERENCES [dbo].[Process_ord_mas] ([processordid]),
	--CONSTRAINT [Fk_Proces_iss_Mas_IssueStoreid] FOREIGN KEY([IssueStoreid]) REFERENCES [dbo].[StoreUnit] ([StoreUnitID])
	)
