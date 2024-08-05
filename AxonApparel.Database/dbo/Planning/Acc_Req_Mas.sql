﻿CREATE TABLE [dbo].[Acc_Req_Mas]
(
	[AccReqMasID] INT IDENTITY(1,1) NOT NULL, 
    [AccReqID] INT NULL, 
	RowSeq INT NULL,
    [ItemID] INT NOT NULL, 
    [UnitId] INT NULL, 
    [Allowance] NUMERIC(9, 3) NULL, 
    [Quantity] NUMERIC(14, 3) NOT NULL, 
    [PlanType] int NULL, 
    [DivMul] CHAR NULL DEFAULT ('N'), 
    [AutoOrMan] CHAR NULL, 
    [Prod_or_Ord] CHAR NULL DEFAULT ('O'), 
    [Item_Remarks] VARCHAR(250) NULL, 
    [Add_Date] DATETIME NULL, 
    [LockRow] CHAR NULL, 
    [ShipRowID] INT NULL, 
    [GenPlanType] CHAR NULL DEFAULT ('O'), 
    [Amend] CHAR NULL DEFAULT ('N'), 
    [CreatedBy] INT NULL, 
    [IsApproved] CHAR NULL, 
    [App_Date] DATETIME NULL,
	[ModifyBy] [int] NULL,
	[ModifyDate] [datetime] NULL,
	PA char(1) NULL,
	[Supplierid] INT NULL, 
    CONSTRAINT [PK_Acc_Req_Mas] PRIMARY KEY ([AccReqMasID]), 
	CONSTRAINT [FK_AccReqStyleRecId] FOREIGN KEY ([AccReqID]) REFERENCES [Acc_Req_Style]([AccReqID]),
	CONSTRAINT [FK_AccEmployeeRef] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_AccReqMasItemId] FOREIGN KEY ([ItemID]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_AccReqMasUnitId] FOREIGN KEY ([UnitId]) REFERENCES [Unit_of_measurement]([UomId]),

)