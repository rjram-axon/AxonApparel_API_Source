﻿CREATE TABLE [dbo].[Prod_Ord_Mas]
(
	[ProductionId] INT IDENTITY(1,1) NOT NULL,
	[ProdOrder] [varchar](20) NULL,
	[processordate] [datetime] NULL,
	[processorid] [int] NULL,
	[processid] [int] NULL,
	[remarks] [varchar](1500) NULL,
	[companyunitid] [int] NULL,
	[companyid] [int] NOT NULL,
	[ProcessorType] [varchar](2) NULL,
	[OrderType] [varchar](2) NULL,
	[Closed] [varchar](1) NULL Default('N'),
	[OrderCumIssue] [varchar](15) NULL,
	[DelidateTime] [datetime] NULL,
	[ComboIds] [varchar](200) NOT NULL Default(''),
	[DispLocType] [varchar](1) NOT NULL Default('S'),
	[DispLoc] [int] NOT NULL,
	[IssueLocType] [varchar](1) NOT NULL Default('O'),
	[IssueLoc] [int] NOT NULL,
	[Teamid] [int] NULL,
	[StoreUnitId] [int] NULL,
	[CreatedBy] [int] NULL,
	[Phoneno] [varchar](100) NULL,
	[contactperson] [varchar](100) NULL,
	[amount] [numeric](12, 2) NULL,
	[taxamount] [numeric](12, 2) NULL,
	[saccode] [varchar](50) NULL,
	[CGST] [numeric](18, 3) NULL,
	[SGST] [numeric](18, 3) NULL,
	[IGST] [numeric](18, 3) NULL,
	[TotCGST] [numeric](18, 3) NULL,
	[TotSGST] [numeric](18, 3) NULL,
	[TotIGST] [numeric](18, 3) NULL,
	CONSTRAINT [PK_id] PRIMARY KEY ([ProductionId]),
	CONSTRAINT [FK_ProdOrdMasCompanyRefid] FOREIGN KEY ([companyid]) REFERENCES [company]([companyid]),
	CONSTRAINT [FK_ProdOrdMasCompanyunitRefid] FOREIGN KEY ([companyunitid]) REFERENCES [companyunit](id),
	CONSTRAINT [FK_ProdOrdMasEmployeeRefid] FOREIGN KEY ([CreatedBy]) REFERENCES Employee(EmployeeId),
	CONSTRAINT [FK_ProdOrdMasProcessRefid] FOREIGN KEY ([processid]) REFERENCES Process(ProcessId),
	--CONSTRAINT [FK_ProdOrdMasProcessRefid] FOREIGN KEY ([Teamid]) REFERENCES Team(TeamId),
	CONSTRAINT [FK_ProdOrdMasStoreUnitRefid] FOREIGN KEY ([StoreUnitId]) REFERENCES [StoreUnit]([StoreUnitId]),
	CONSTRAINT [FK_ProdOrdMasDisplayLocTypetRefid] CHECK  (([DispLocType] = 'P' or [DispLocType] = 'O' or [DispLocType] = 'S' or [DispLocType] = 'C')),
	CONSTRAINT [FK_ProdOrdMasIssuLocTypetRefid] CHECK  (([IssueLocType] = 'O' or [IssueLocType] = 'C' )),
	CONSTRAINT [FK_ProdOrdMasOrderTypetRefid] CHECK  (([OrderType] = 'W' or [OrderType] = 'J' or [OrderType] = 'S' or [OrderType] = 'G' or [OrderType] = 'L')),
	CONSTRAINT [FK_ProdOrdMasProcessorTypetRefid] CHECK  (([ProcessorType] = 'P' or [ProcessorType] = 'W' ))
)
