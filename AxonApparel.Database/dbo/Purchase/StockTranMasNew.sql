﻿CREATE TABLE [dbo].[StockTranMasNew]
(
    [TransferId] [int] IDENTITY(1,1) NOT NULL,
	[TransNo] [varchar](20) NOT NULL,
	[TransDate] [datetime] NULL,
	[FromCompId] [int] NOT NULL,
	[ToCompId] [int] NOT NULL,
	[TransType] [varchar](2) NULL,
	[FromRef] [varchar](25) NULL,
	[FromStyleid] [int] NULL,
	[ToRef] [varchar](25) NULL,
	[ToStyleid] [int] NULL,
	[ItemGroupId] [int] NOT NULL,
	[Processid] [int] NULL,
	[FromStoreUnitID] [int] NULL,
	[ToStoreUnitID] [int] NULL,
	[CreatedBy] [int] NULL,
	[IsLotStock] [char](1) NULL,
	[FromLotid] [int] NULL,
	[ToLotid] [int] NULL,
	[SizeFlag] [char](1) NULL,
	[Remarks] [varchar](225) NULL, 
    CONSTRAINT [PK_StockTranMasNew] PRIMARY KEY ([TransferId]), 
    CONSTRAINT [FK_StockTranMasNew_Lot_Creation_Mas] FOREIGN KEY ([FromLotid]) REFERENCES [Lot_Creation_Mas]([Lotid]),
	CONSTRAINT [FK_StockTranMasNew_Lot_Creation_MasToId] FOREIGN KEY ([ToLotid]) REFERENCES [Lot_Creation_Mas]([Lotid]),
	CONSTRAINT [FK_StockTranMasNew_Employee] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_StockTranMasNew_StoreUnit] FOREIGN KEY ([ToStoreUnitID]) REFERENCES [StoreUnit]([StoreUnitID])
)
