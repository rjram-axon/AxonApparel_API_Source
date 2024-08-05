﻿CREATE TABLE [dbo].[Cutting_Order_Mas]
(
	[CuttingOrdid] INT IDENTITY(1,1) NOT NULL, 
    [CuttingOrderNo] VARCHAR(20) NOT NULL, 
    [Joborderno] VARCHAR(20) NULL, 
    [Cutdate] DATETIME NULL, 
    [Employeeid] INT NULL, 
    [Remarks] VARCHAR(500) NULL, 
    [companyunitid] INT NULL, 
    [Companyid] INT NULL, 
    [internalorexternal] CHAR NULL, 
    [OrderType] VARCHAR NULL, 
    [WorkDivisionid] INT NULL, 
    [LossPer] NUMERIC(3) NULL, 
    [OrderCumIssue] VARCHAR(20) NULL, 
    [ProdPrgid] INT NULL, 
    [Closed] CHAR NULL DEFAULT ('N'), 
    [Cancelled] CHAR NULL DEFAULT ('N'), 
    [ConvType] CHAR NULL, 
    [DeliveryDate] DATETIME NULL, 
    [CreatedBy] INT NULL, 
    [FLineId] INT NULL, 
    [Issueunitid] INT NULL, 
    [CGST] NUMERIC(18, 3) NULL, 
    [SGST] NUMERIC(18, 3) NULL, 
    [IGST] NUMERIC(18, 3) NULL, 
    [TotCGST] NUMERIC(18, 3) NULL, 
    [TotSGST] NUMERIC(18, 3) NULL, 
    [TotIGST] NUMERIC(18, 3) NULL, 
    [Saccode] VARCHAR(50) NULL,
	CONSTRAINT [PK_CuttinOrderid] PRIMARY KEY ([CuttingOrdid]),
	CONSTRAINT [FK_EmploId] FOREIGN KEY ([Employeeid]) REFERENCES [Employee]([EmployeeId]),
	CONSTRAINT [FK_ProdPrgIdCutting] FOREIGN KEY (ProdPrgid) REFERENCES [Prod_Prg_Mas](ProdPrgid),
	CONSTRAINT [FK_createdId] FOREIGN KEY (CreatedBy) REFERENCES [Employee]([EmployeeId]),
	--CONSTRAINT [FK_createdId] FOREIGN KEY ([FLineId]) REFERENCES [Fixed_line_mas]([fLineMasId]),
	CONSTRAINT [Ck_CuttOrdMas_ConvType] CHECK  (([ConvType] = 'K' or [ConvType] = 'M')),
	CONSTRAINT [Ck_CuttOrdMas_CuttingOrdNo] CHECK  ([CuttingOrderNo] <> ''),
)
