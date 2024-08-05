CREATE TABLE [dbo].[Country]
(
	[countryid] INT PRIMARY KEY IDENTITY(1,1)  NOT NULL,
    [country] NVARCHAR(40) NOT NULL, 
    [lookup] NVARCHAR(20) NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1
)