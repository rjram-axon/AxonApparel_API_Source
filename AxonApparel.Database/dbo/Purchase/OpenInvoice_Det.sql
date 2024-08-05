CREATE TABLE [dbo].[OpenInvoice_Det]
(
	[Open_InvID] [int] NULL,
	[Open_Inv_DetID] [int] IDENTITY(1,1) NOT NULL primary key,
	[CostHead] [varchar](100) NOT NULL,
	[Rate] [numeric](10, 3) NOT NULL,
	[Qty] [numeric](10, 3) NOT NULL,
	[Amount] [numeric](10, 3) NOT NULL,
	[UOMID] [int] NULL,
	[Order_No] [varchar](35) NULL,
	[Job_Ord_No] [varchar](35) NULL,
	[Refno] [varchar](35) NULL,
	[ItemId] [int] NULL,
	CONSTRAINT [FK_OpenInvoice_Mas_OpenInvID] FOREIGN KEY([Open_InvID]) REFERENCES [dbo].[OpenInvoice_Mas] ([Open_InvID]),
	CONSTRAINT [FK_OpenInvoice_Mas_UOMID] FOREIGN KEY([UOMID]) REFERENCES [dbo].[Unit_of_measurement] ([UomId])
)
