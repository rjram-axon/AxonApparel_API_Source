CREATE TABLE [dbo].[Currency]
(	
	[CurrencyId] [int] IDENTITY(1,1) NOT NULL,
	[Currency] [varchar](40) NOT NULL,
	[Abbreviation] [varchar](5) NOT NULL,
	[Exchangerate] [numeric](6, 2) DEFAULT (1) NULL,
	[CountryID] [int] NULL,
	[Euro] [bit] NOT NULL,
	[Decimalplace] [tinyint] DEFAULT (2) NOT NULL,
	[IsActive] [bit] DEFAULT (1) NOT NULL, 
    CONSTRAINT [PK_Currency] PRIMARY KEY ([CurrencyId])
)
