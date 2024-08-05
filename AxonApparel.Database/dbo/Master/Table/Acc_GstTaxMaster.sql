CREATE TABLE [dbo].[Acc_GstTaxMaster]
(
	[GSTtaxcode] [char](6) NOT NULL,
	[GSTtaxdesc] [varchar](40) NOT NULL,
	[CGSTper] [numeric](5, 2) NOT NULL,
	[SGSTper] [numeric](5, 2) NOT NULL,
	[IGSTper] [numeric](5, 2) NOT NULL,
	[Addtaxper] [numeric](5, 2) NOT NULL,
	[Ttype] [char](5) NOT NULL,
	[rstatus] [char](1) NOT NULL,
	[sortorder] [numeric](8, 0) NOT NULL,
	[enteredby] [varchar](15) NOT NULL,
	[enteredDate] [datetime] NOT NULL,
	[modifiedby] [varchar](15) NOT NULL,
	[modifiedDate] [datetime] NOT NULL,
	[Type] [char](1) NULL,
	[id] [int] Identity(1,1)

)

