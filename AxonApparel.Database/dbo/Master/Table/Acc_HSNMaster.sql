CREATE TABLE [dbo].[Acc_HSNMaster]
(	[HSNid] [int] Identity(1,1),
	[HSNcode] [char](12) NOT NULL,
	[HSNdesc] [varchar](60) NOT NULL,
	[Ttype] [char](1) NOT NULL,
	[sortorder] [numeric](8, 0) NOT NULL,
	[rstatus] [char](1) NOT NULL,
	[GSTtaxcode] [char](6) NOT NULL,
	[IGSTtaxcode] [char](6) NOT NULL,
	[enteredby] [varchar](15) NOT NULL,
	[enteredDate] [datetime] NOT NULL,
	[modifiedby] [varchar](15) NOT NULL,
	[modifiedDate] [datetime] NOT NULL
)
