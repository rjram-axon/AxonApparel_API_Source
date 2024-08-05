CREATE TABLE [dbo].[Agent_Add]
(
	[Agent_AddId] [int] IDENTITY(1,1) NOT NULL,
	[AgentId] [int] NULL,
	[Address1] [varchar](40) NULL,
	[Address2] [varchar](40) NULL,
	[Address3] [varchar](40) NULL,
	[CityId] [int] NULL,
	[CountryId] [int] NULL,
	[Zipcode] [varchar](10) NULL,
	[Phone] [varchar](30) NULL,
	[Fax] [varchar](30) NULL,
	[E_Mail] [varchar](50) NULL,
	[Telex] [varchar](30) NULL,
	[Type] [varchar](2) NULL,
	[PreferedCourier] [varchar](40) NOT NULL DEFAULT (''),
	[CourierNo] [varchar](40) NOT NULL DEFAULT (''),
	[IsActive] [bit] NOT NULL DEFAULT (1), 
    CONSTRAINT [PK_Agent_Add] PRIMARY KEY ([Agent_AddId]), 
    CONSTRAINT [FK_Agent_Add_City] FOREIGN KEY ([CityId]) REFERENCES [City]([Id]),
	CONSTRAINT [FK_Agent_Add_ToAgent] FOREIGN KEY ([AgentId]) REFERENCES [Agent]([AgentId]),
	CONSTRAINT [FK_Agent_Add_ToCountry] FOREIGN KEY ([CountryId]) REFERENCES [Country]([CountryId]), 
    CONSTRAINT [CK_Agent_Add_Type] CHECK ([Type] = 'S' or [Type] = 'B')
)
