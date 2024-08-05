CREATE TABLE [dbo].[Mode_Of_Shipment]
(
	[Mode_of_Shipmentid] [INT] PRIMARY KEY IDENTITY(1,1)  NOT NULL,
	[Mode_of_Shipment] [nvarchar](50) NOT NULL UNIQUE,
	[IsActive] [bit] NOT NULL DEFAULT (1)
)