CREATE TABLE [dbo].[Special_Req_Det]
(
[Spl_Req_Detid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Spl_Reqid] [int] NULL,
	[Itemid] [int] NULL,
	[Colorid] [int] NULL,
	[Sizeid] [int] NULL,
	[UOMid] [int] NULL,
	[Quantity] [numeric](9, 3) NULL,
	[App_Qty] [numeric](9, 3) NULL,
	[Issue_Qty] [numeric](14, 3) NOT NULL DEFAULT (0.000),
	[ReqType] [varchar](1) NOT NULL DEFAULT ('P'),
	[transferIn] [numeric](12, 3) NULL,
	[Order_Qty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[Received_Qty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[Cancel_Qty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[Debit_Qty] [numeric](14, 3) NOT NULL DEFAULT (0),
	[Pur_UOMid] [int] NULL,
	[ToPurUOM] [numeric](10, 3) NOT NULL DEFAULT (1),
	[Conv_Mode] [varchar](1) NOT NULL DEFAULT ('M'),
	
	CONSTRAINT [FK_Special_Req_uomid] FOREIGN KEY([Pur_UOMid]) REFERENCES [dbo].[Unit_of_measurement] ([UomId]),
	CONSTRAINT [FK_Special_Req_reqid] FOREIGN KEY([Spl_Reqid]) REFERENCES [dbo].[Special_Req_Mas] ([Spl_Reqid]),

	
	)
