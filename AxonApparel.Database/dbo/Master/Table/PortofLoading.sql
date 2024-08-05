CREATE TABLE [dbo].[PortofLoading]
(
	[PortOfLoadingId] [int] IDENTITY(1,1) NOT NULL,
	[PortOfLoading] [varchar](40) NOT NULL,
	[Countryid] [int] NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1),
	[PortCode] [varchar](50) NULL, 
    CONSTRAINT [PK_PortofLoading] PRIMARY KEY ([PortOfLoadingId]), 
    CONSTRAINT [FK_PortofLoading_Country] FOREIGN KEY ([CountryId]) REFERENCES [Country]([CountryId])
)
