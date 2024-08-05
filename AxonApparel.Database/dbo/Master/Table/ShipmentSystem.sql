
CREATE TABLE [dbo].[ShipmentSystem](
	[SystemId] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[System] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[FreeorCharge] [char] Default (1) NOT NULL
	)