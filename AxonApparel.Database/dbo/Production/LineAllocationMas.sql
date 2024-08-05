CREATE TABLE [dbo].[LineAllocationMas]
(
	[LMasid] INT IDENTITY(1,1) NOT NULL,
	[jobOrWork] [char](1) NULL,
	[JoborderNo] [varchar](15) NOT NULL,
	[CompanyId] [int] NULL,
	[Unitid] [int] NULL,
	CONSTRAINT [PK_LineAllocaMasid] PRIMARY KEY ([LMasid]),
	CONSTRAINT [FK_LineAllocationCompanyId] FOREIGN KEY ([CompanyId]) REFERENCES Company(CompanyId),
	CONSTRAINT [FK_LineAllocationCompanyUnitId] FOREIGN KEY ([Unitid]) REFERENCES Companyunit(Id),
)
