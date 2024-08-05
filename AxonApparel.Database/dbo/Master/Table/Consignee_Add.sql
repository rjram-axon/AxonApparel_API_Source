CREATE TABLE [dbo].[Consignee_Add]
(
	[Consignee_AddId] [int] IDENTITY(1,1) NOT NULL,
	[ConsigneeId] [int] NOT NULL,
	[Address1] [varchar](40) NOT NULL DEFAULT (''),
	[Address2] [varchar](40) NULL,
	[Address3] [varchar](40) NULL,
	[CityId] [int] NULL,
	[CountryId] [int] NULL,
	[ZipCode] [varchar](10) NULL,
	[Phone] [varchar](30) NULL,
	[Fax] [varchar](30) NULL,
	[E_Mail] [varchar](50) NULL,
	[Telex] [varchar](30) NULL,
	[SourceId] [int] NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1),
	[Tin_No] [varchar](30) NULL, 
    CONSTRAINT [PK_Consignee_Add] PRIMARY KEY ([Consignee_AddId]),
	CONSTRAINT [FK_Consigne_Add_City] FOREIGN KEY ([CityId]) REFERENCES [City]([Id]),
	CONSTRAINT [FK_Consigne_Add_Consignee] FOREIGN KEY ([ConsigneeId]) REFERENCES [Consignee]([ConsigneeId]),
	CONSTRAINT [FK_Consigne_Add_ToCountry] FOREIGN KEY ([CountryId]) REFERENCES [Country]([countryid])
)
