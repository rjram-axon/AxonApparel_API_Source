CREATE TABLE [dbo].[CompanyUnit]
(
	[Id] INT PRIMARY KEY IDENTITY(1,1)  NOT NULL,
	CompanyUnit nvarchar(40) NOT NULL,
	CUnitLookup nvarchar(10) NULL,
	Address1 nvarchar(50) NULL,
	Address2 nvarchar(50) NULL,
	Address3 nvarchar(50) NULL,
	CityId int NULL,
	Zipcode nvarchar(10) NULL,
	CompanyId int NOT NULL,
	IssueType char(1) NOT NULL,
	IsActive bit NOT NULL DEFAULT 1,
    [WastageCut] [numeric](12, 2) DEFAULT (0.00) NULL,
	 [WastageProc] [numeric](12, 2) DEFAULT (0.00) NULL,
	  [OrderOverHeads] [numeric](12, 2) DEFAULT (0.00) NULL,
	   [QuoteOverHeads] [numeric](12, 2) DEFAULT (0.00) NULL,
	    [OfficeExpense] [numeric](12, 2) DEFAULT (0.00) NULL,
	CONSTRAINT [FK_CompanyCity] FOREIGN KEY ([CityId]) REFERENCES [City]([Id])

)
