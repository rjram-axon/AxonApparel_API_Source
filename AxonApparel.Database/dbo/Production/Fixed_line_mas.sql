CREATE TABLE [dbo].[Fixed_line_mas]
(
	[FLineMasId] INT IDENTITY(1,1) NOT NULL,
	[FLineNo] [varchar](20) NOT NULL,
	[Unitid] [int] NULL,
	[WorkDivId] [int] NULL,
	[InchargeId] [int] NULL,
	[Description] [varchar](250) NULL,
	CONSTRAINT [PK_Fixedlineid] PRIMARY KEY ([fLineMasId]),
	CONSTRAINT [FK_EmployeeId] FOREIGN KEY (InchargeId) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_CompanyunitId] FOREIGN KEY (InchargeId) REFERENCES CompanyUnit([id]),
	CONSTRAINT [FK_workdivisionId] FOREIGN KEY (WorkDivId) REFERENCES WorkDivision([WorkDivisionId]),
)
