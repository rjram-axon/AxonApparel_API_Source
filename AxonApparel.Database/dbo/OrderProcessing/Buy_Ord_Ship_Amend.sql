﻿CREATE TABLE [dbo].[Buy_Ord_Ship_Amend]
(
	[ShipRowAmendId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[ShipRowId] [int] NULL,
	[Buy_Ord_Ship] [varchar](8) NOT NULL,
	[Order_No] [varchar](20) NULL,
	[Buy_Ord_MasId] [int] NULL,
	[StyleId] [int] NULL,
	[Ship_Date] [datetime] NULL,
	[ItemMode] [char](1) NULL,
	[Dest_Code] [int] NOT NULL,
	[Quantity] [numeric](8, 0) NULL,
	[Job_Qty] [numeric](8, 0) NULL,
	[Finish_Qty] [numeric](8, 0) NULL,	
	[StyleRowid] [int] NULL,
	[Lotno] [varchar](25) NULL,
	[ProductionQty] [numeric](9, 0) NULL,
	[Despatch_Qty] [int] NULL,
	[PortOfLoadingId] [int] NULL,
	[ShipAmend] [varchar](1) NOT NULL DEFAULT ('N'),
	[AllowancePer] [numeric](9, 2) NOT NULL DEFAULT (0),
	[Despatch_Closed] [char](1) NULL DEFAULT (null),
	[CreatedBy] [int] NULL, 
	[SlNo][int] NULL,
	[DelDate] DATETIME NULL, 
   [PA] [char](1) NULL DEFAULT ('P'),
    CONSTRAINT [CK_Buy_Ord_Ship_am_Column] CHECK (([itemmode] = 'M' or [itemmode] = 'S' or [itemmode] = 'A' or [itemmode] = 'C')), 
    --CONSTRAINT [FK_Buy_Ord_Ship_Buy_Ord_Mas] FOREIGN KEY ([Buy_Ord_MasId]) REFERENCES [Buy_Ord_Mas]([Buy_Ord_MasId]),
	CONSTRAINT [FK_Buy_Ord_Ship_am_StyleHeader] FOREIGN KEY ([StyleId]) REFERENCES [StyleHeader]([StyleId]),
	CONSTRAINT [FK_Buy_Ord_Ship_am_Employee] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_Buy_Ord_Ship_am_PortofLoading] FOREIGN KEY ([PortOfLoadingId]) REFERENCES [PortOfLoading]([PortOfLoadingId])
)
