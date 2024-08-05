CREATE TABLE [dbo].[Unit_Grn_Mas]
(
	[Unit_GRN_Masid] [int] IDENTITY(1,1) NOT NULL primary key,
	[ReceiptCat] [varchar](1) NULL,
	[Job_Ord_No] [varchar](20) NULL,
	[Unit_GRN_No] [varchar](20) NOT NULL,
	[Unit_GRN_date] [datetime] NULL,
	[Unit_GRN_RefNo] [varchar](13) NULL,
	[Unit_GRN_RefDate] [datetime] NULL,
	[Remarks] [varchar](1500) NULL,
	[FromUnit] [int] NULL,
	[CompanyUnitid] [int] NULL,
	[Companyid] [int] NULL,
	[CommitCancel] [varchar](1) NULL,
	[ForUnit] [int] NULL,
	[RecOrRet] [char](1) NOT NULL DEFAULT ('R'),
	[UnitOrOther] [char](1) NOT NULL DEFAULT ('U'),
	[ProcessId] [int] NULL,
	[StoreUnitID] [int] NULL,
	[CreatedBy] [int] NULL,
	[FromDivision] [int] NULL,
	[ForDivision] [int] NULL,

	FOREIGN KEY([ProcessId]) REFERENCES [dbo].[Process] ([ProcessId]),
	CONSTRAINT [fk_unit_grn_mas_companyid] FOREIGN KEY([Companyid]) REFERENCES [dbo].[Company] ([CompanyId]),
	CONSTRAINT [fk_unit_grn_mas_companyunitid] FOREIGN KEY([CompanyUnitid]) REFERENCES [dbo].[CompanyUnit] ([Id]),
	 CONSTRAINT [FK_Unit_grn_mas_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),
	 CONSTRAINT [fk_unit_grn_mas_forunit] FOREIGN KEY([ForUnit]) REFERENCES [dbo].[CompanyUnit] ([Id]),
	 CONSTRAINT [ck_unit_grn_mas_ReceiptCat] CHECK  (([ReceiptCat] = 'G' or [ReceiptCat] = 'P' or [ReceiptCat] = 'W' or [ReceiptCat] = 'S')),
	 CONSTRAINT [ck_unit_grn_mas_RecOrRet] CHECK  (([RecOrRet] = 'R' or [RecOrRet] = 'T')),
	 CONSTRAINT [ck_unit_grn_mas_unitorother] CHECK  (([UnitOrOther] = 'U' or [UnitOrOther] = 'S')),


)
