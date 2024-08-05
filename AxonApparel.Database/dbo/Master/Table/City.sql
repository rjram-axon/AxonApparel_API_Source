CREATE TABLE [dbo].[City]
(
	[Id] INT PRIMARY KEY IDENTITY(1,1)  NOT NULL, 
    [City] NVARCHAR(100) NOT NULL, 
    [CountryId] INT NOT NULL, 
	[StateId] INT  NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1,
	CONSTRAINT [FK_Country] FOREIGN KEY ([CountryId]) REFERENCES [Country]([countryid])
  
)
