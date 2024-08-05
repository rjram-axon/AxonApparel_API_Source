CREATE TABLE [dbo].[Stores_Issue_ReturnMas]
(
	[ReturnId] INT IDENTITY(1,1) NOT NULL, 
	[Issueid] [int] NULL,
	[ReturnNo] [varchar](20) NOT NULL,
	[ReturnDate] [datetime] NULL,
	[Remarks] [varchar](250) NOT NULL DEFAULT (''),
	[StockType] [char](1) NULL DEFAULT (Null),
	[Unit_Supplier_self] [varchar](1) NULL,
	[Desunitid] [int] NULL,
	[CreatedBy] [int] NULL,
	[QualityMade] [char](1) NULL,
    CONSTRAINT [PK_Stores_Issue_ReturnMas] PRIMARY KEY ([ReturnId]), 
    CONSTRAINT [FK_Stores_Issue_ReturnMas_Stores_Issue_Mas] FOREIGN KEY ([Issueid]) REFERENCES [Stores_Issue_Mas]([IssueId]), 
    CONSTRAINT [FK_Stores_Issue_ReturnMas_Employee] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]), 
    CONSTRAINT [CK_Stores_Issue_ReturnMas_Unit_Supplier_self] CHECK (([Unit_Supplier_Self] = 'F' or [Unit_Supplier_Self] = 'U' or [Unit_Supplier_Self] = 'T' or [Unit_Supplier_Self] = 'S'))
)
