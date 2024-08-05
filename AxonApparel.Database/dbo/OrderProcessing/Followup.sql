CREATE TABLE [dbo].[Followup]
(
	[Id] INT PRIMARY KEY IDENTITY(1,1)  NOT NULL, 
    [CompanyId] INT NOT NULL, 
    [EntryNo] NVARCHAR(30) NULL, 
    [Date] DATETIME NULL, 
    [BuyerId] INT NULL, 
    [Enquiryid] int NULL,
    [Statusid] INT NULL, 
    [EmployeeId] INT NULL, 
    [QuotationNo] VARCHAR(30) NULL, 
    [QuotationStyle] NVARCHAR(30) NULL, 
    [QuoDate] DATETIME NULL, 
    [Action] NVARCHAR(100) NULL, 
    [ToContact] NVARCHAR(30) NULL, 
    [NextFollowDate] DATETIME NULL, 
    [Remarks] NVARCHAR(100) NULL,
		CONSTRAINT [FK_Employee] FOREIGN KEY ([EmployeeId]) REFERENCES [Employee]([EmployeeId])
)
