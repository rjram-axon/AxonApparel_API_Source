CREATE TABLE [dbo].[WorkDivision]
(
	[WorkDivisionId] [int] IDENTITY(1,1) NOT NULL,
	[WorkDivision] [varchar](50) NOT NULL,
	[Inchargeid] [int] NULL,
	[Unitid] [int] NULL,
	[DivisionType] [varchar](1) NOT NULL DEFAULT ('O'),
	[IsActive] [bit] NOT NULL DEFAULT (1), 
    CONSTRAINT [PK_WorkDivision] PRIMARY KEY ([WorkDivisionId]), 
    CONSTRAINT [FK_WorkDivision_Employee] FOREIGN KEY ([Inchargeid]) REFERENCES [employee]([employeeid]),
	CONSTRAINT [FK_WorkDivision_company_unit] FOREIGN KEY ([Unitid]) REFERENCES [companyunit]([Id])
)
