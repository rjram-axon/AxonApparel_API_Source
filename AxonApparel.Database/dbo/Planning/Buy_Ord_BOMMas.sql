CREATE TABLE [dbo].[Buy_Ord_BOMMas]
(
[Buy_Ord_BOMid] [int] IDENTITY(1,1) NOT NULL primary key,
	[Order_No] [varchar](20) NULL,
	[Styleid] [int] NULL,
	[Access_Type] [varchar](3) NULL,
	[Order_Qty] [bigint] NOT NULL DEFAULT (0),
	[ToJob] [bigint] NOT NULL DEFAULT (0),
	[ByJob] [bigint] NOT NULL DEFAULT (0),
	[Prog_thru] [varchar](1) NULL,
	[Companyid] [int] NULL,
	[ToWork] [int] NULL DEFAULT (0),
	[seqno] [int] NULL,
	
	CONSTRAINT [fk_Buy_Ord_BOMMas_Companyid] FOREIGN KEY([Companyid]) REFERENCES [dbo].[Company] ([CompanyId]),
	CONSTRAINT [fk_Buy_Ord_BOMMas_styleid] FOREIGN KEY([Styleid])REFERENCES [dbo].[StyleHeader] ([StyleId]),

	)
