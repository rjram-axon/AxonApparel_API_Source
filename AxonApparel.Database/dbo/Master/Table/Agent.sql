CREATE TABLE [dbo].[Agent]
(
	[AgentId] [int] IDENTITY(1,1) NOT NULL,
	[Agent] [varchar](40) NOT NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1), 
	[Address1] [varchar](40) NULL,
	[Address2] [varchar](40) NULL,
	[Address3] [varchar](40) NULL,
	[CityId] [int] NULL,
	[CountryId] [int] NULL,	
	[Zipcode] [varchar](10) NULL,
	[Type] [varchar](2) NULL,
	[Phone] [varchar](30) NULL,
	[Contact Name] [varchar](40) NOT NULL DEFAULT (''),
	[Mob_No] [numeric](15, 0) NOT NULL DEFAULT (''),
    
    CONSTRAINT [FK_Agent_City] FOREIGN KEY ([CityId]) REFERENCES [City]([Id]),	
    CONSTRAINT [CK_Agent_Type] CHECK ([Type] = 'S' or [Type] = 'B'),
    CONSTRAINT [PK_Agent] PRIMARY KEY ([AgentId]),
	CONSTRAINT [FK_Agent_ToCountry] FOREIGN KEY ([CountryId]) REFERENCES [Country]([countryId]) 
)
