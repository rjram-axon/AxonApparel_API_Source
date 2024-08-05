CREATE TABLE [dbo].[BuyerAmendDetails]
(
	[amendID] [int] IDENTITY(1,1) NOT NULL,
	[amendDate] [datetime] NULL,
	[Order_no] [varchar](20) NOT NULL,
	[Styleid] [int] NULL,
	[AmendQty] [numeric](8, 0) NULL
)
