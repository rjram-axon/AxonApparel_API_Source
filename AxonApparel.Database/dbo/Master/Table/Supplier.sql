﻿CREATE TABLE [dbo].[Supplier]
(
	[SupplierId] INT NOT NULL identity(1,1) ,
	[Supplier] [varchar](250) NULL,
	[LookUp] [varchar](90) NULL,
	[Address1] [varchar](250) NULL,
	[Address2] [varchar](250) NULL,
	[Address3] [varchar](250) NULL,
	[CityId] [int] NULL,
	[CountryId] [int] NULL,	
	[Zipcode] [varchar](50) NULL,
	[Contact Name] [varchar](40) NOT NULL DEFAULT (''),
	--[Mob_No] [numeric](15, 0) NOT NULL DEFAULT (''),
	Mob_No varchar(20) null,
	[E_Mail] nvarchar(100),
	Fax nvarchar(60),
	CST_No int null,
	CST_Date Date null,
    --TIN_No int null,
	TIN_No varchar(50) null,
	TIN_Date Date null,  
	supplier_type [varchar](50) NULL, 	 
	[IsActive] [bit]  DEFAULT (1) NOT NULL,
	[telex] [varchar](30) NULL,
	[TNGST] [varchar](50) NULL,
	[CGST] [varchar](50) NULL,
	[GST] [varchar](50) NULL,
	[GSTNO] [varchar](50) NULL,
	[SLCode][varchar](15)NULL,	
	[c]  varchar(5) null,	
	[Rstatus] varchar(1) null,
	[SLType]  varchar(5) null,
	[UnRegister] [varchar](100) NULL,
	[EwayApply] [varchar](100) NULL,
	[Panno] [varchar](100) NULL,
	[EccCode] [varchar](100) NULL,
	[PartyStatus] [varchar](100) NULL,
	[ECCDiv] [varchar](100) NULL,
	[Paytype] [varchar](100) NULL,
	[TDSApply] [varchar](100) NULL,
	[TDSCat] [varchar](100) NULL,
	[StopPayment] [varchar](100) NULL,
	[CreditDays] [numeric](3, 0) NULL,
	[GLCategory] [varchar](100) NULL,
	[GroupSL] [varchar](100) NULL,
	[FavFlag] [varchar](100) NULL,
	[EccRange] [varchar](100) NULL,
	[ContactBy] [varchar](100) NULL,
	[PartyTerms] [varchar](10) NULL,
	[SecurityDepAmt] [numeric](18, 2) NULL,	
	[GstApplicable] [varchar](1) NULL DEFAULT ('Y'),
	CONSTRAINT [FK_Supplier_ToCity] FOREIGN KEY ([CityId]) REFERENCES [City]([Id]),
	CONSTRAINT [FK_Supplier_ToCountry] FOREIGN KEY ([CountryId]) REFERENCES [Country]([countryId]) ,
	CONSTRAINT [PK_Supplier] PRIMARY KEY ([SupplierId])

)
