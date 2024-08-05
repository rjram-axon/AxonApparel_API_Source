CREATE TABLE [dbo].[Comp_prg_mas]
(
	[ProdPrgid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Prodprgno] [varchar](20) NOT NULL,
	[ProgDate] [datetime] NULL,
	[ProcessId] [int] NULL,
	[Job_ordno] [varchar](20) NULL,
	[companyunitid] [int] NULL,
	[companyid] [int] NULL,
	[remarks] [varchar](100) NOT NULL DEFAULT (''),
	[OrderType] [varchar](1) NULL,
	[ProgramType] [varchar](1) NULL,
	[Prog_Seq_No] [int] NULL,
	[Closed] [varchar](1) NOT NULL DEFAULT ('N'),
	[Amend] [varchar](1) NOT NULL DEFAULT ('N'),
	[CreatedBy] [int] NULL,
	[Approved] [char](1) NULL,

	FOREIGN KEY([companyunitid]) REFERENCES [dbo].[CompanyUnit] ([Id]),
	FOREIGN KEY([companyid]) REFERENCES [dbo].[Company] ([CompanyId]),
	FOREIGN KEY([ProcessId]) REFERENCES [dbo].[Process] ([ProcessId]),
	CONSTRAINT [FK_Comp_Prg_Mas_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),

)
