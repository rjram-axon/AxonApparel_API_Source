CREATE TABLE [dbo].[Courier]
(
	[CourierId] [int] IDENTITY(1,1) NOT NULL,
	[Courier] [varchar](50) NOT NULL,
	[CourierAddress] [varchar](1000) NULL,
	[URL] [varchar](300) NULL,
	[Email] [varchar](100) NULL,
	[Phone] [varchar](50) NULL,
	[Fax] [varchar](50) NULL,
	[CountryId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL DEFAULT ('1'), 
    CONSTRAINT [PK_Courier] PRIMARY KEY ([CourierId]),
	CONSTRAINT [FK_Courier_Country] FOREIGN KEY ([CountryId]) REFERENCES [Country]([countryid])

)
