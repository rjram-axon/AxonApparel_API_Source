CREATE TABLE [dbo].[QuotationHeader]
(
	[Id] INT PRIMARY KEY IDENTITY(1,1)  NOT NULL, 
    [Enquiry] NVARCHAR(40) NULL, 
    [EnqRef] NVARCHAR(30) NULL, 
    [RefStyle] NVARCHAR(30) NULL, 
    [EndDate] DATETIME NULL, 
    [RefDate] DATETIME NULL, 
    [EntryNo] NVARCHAR(40) NULL, 
    [EntryDate] DATETIME NULL, 
    [Style] NVARCHAR(50) NULL, 
    [CompanyId] INT NULL, 
    [BuyerId] INT NULL 
)
