CREATE TABLE [dbo].[Box_Despatch_mas](
	[DespatchId] [int] IDENTITY(1,1) NOT NULL,
	[Companyid] [int] NULL,
	[DespatchNo] [varchar](20) NOT NULL,
	[DespatchDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	CONSTRAINT [Pk_Box_Despatch_mas_DespatchId] PRIMARY KEY([despatchid]),
	CONSTRAINT [Fk_Box_Despatch_mas_Companyid] FOREIGN KEY([companyid]) REFERENCES [dbo].[Company] ([CompanyId]),
	CONSTRAINT [Fk_Box_Despatch_mas_CreatedBy] FOREIGN KEY([createdby]) REFERENCES [dbo].[Employee] ([EmployeeId])
)