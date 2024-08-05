CREATE TABLE [dbo].[Consignee]
(
	[ConsigneeId] [int] IDENTITY(1,1) NOT NULL,
	[Consignee] [varchar](40) NULL,
	[Consignee_Lookup] [varchar](10) NOT NULL,
	[Remarks] [varchar](2000) NULL,
	Address1 varchar(40) not null,
	Address2 varchar(40) null,
	Address3 varchar(40) null,
	[CityId] [int] NULL,
	Zipcode varchar(30) not null,
	[IsActive] [bit] NOT NULL DEFAULT (1), 
    CONSTRAINT [FK_Consignee_Buyer] FOREIGN KEY ([CityId]) REFERENCES [City]([Id]), 
    CONSTRAINT [PK_Consignee] PRIMARY KEY ([ConsigneeId])
)
