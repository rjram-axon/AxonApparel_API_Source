CREATE TABLE [dbo].[Bank]
(
	[Id] INT NOT NULL PRIMARY KEY identity(1,1),
	Bank varchar(40),
	[LookUp] [varchar](90) NULL,
	[Address1] [varchar](40) NULL,
	[Address2] [varchar](40) NULL,
	[Address3] [varchar](40) NULL,
	[CityId] [int] NULL,
	[CountryId] [int] NULL,	
	[Zipcode] [varchar](10) NULL,
	[Contact Name] [varchar](40) NOT NULL DEFAULT (''),
	[Mob_No] [numeric](15, 0) NOT NULL DEFAULT (''),
	[E_Mail] nvarchar(40),
	Fax nvarchar(30),
	Telex nvarchar(30),
	ShortCode nvarchar(30),
	ShiftNo int,
	[IsActive] [bit] NOT NULL DEFAULT (1), 
	CONSTRAINT [FK_Bank_ToCity] FOREIGN KEY ([CityId]) REFERENCES [City]([Id]),
	CONSTRAINT [FK_Bank_ToCountry] FOREIGN KEY ([CountryId]) REFERENCES [Country]([countryid]) ,
	
	
)
