CREATE TABLE [dbo].[Job_Ord_Det_Amend]
(
	[JodDetAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1) ,
	[Job_Ord_No] [varchar](20) NOT NULL,
	[Buy_ord_ship] [varchar](8) NOT NULL,
	[Quantity] [numeric](8, 0) NULL,
	[Finish_qty] [numeric](8, 0) NULL,
	[Despatch_qty] [numeric](8, 0) NULL,
	[Delivery_date] [datetime] NULL,
	[WorkOrd_Qty] [numeric](8, 0) NULL,
	[Style_qty] [numeric](14, 3) NULL,
	[Sty_FinQty] [numeric](14, 3) NULL,
	[Sty_despQty] [numeric](14, 3) NULL,
	[Ck_date] [date] NULL,

	--CONSTRAINT [ck1_job_ord_det] PRIMARY KEY CLUSTERED ([Job_Ord_No] ASC,[Buy_ord_ship] ASC),
	--CONSTRAINT [fk1_job_ord_det] FOREIGN KEY([Job_Ord_No]) REFERENCES [dbo].[Job_Ord_Mas] ([Job_Ord_No])
)
