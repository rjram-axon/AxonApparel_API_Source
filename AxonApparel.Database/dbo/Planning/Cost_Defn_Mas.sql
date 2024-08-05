﻿CREATE TABLE [dbo].[Cost_Defn_Mas]
(
	[Cost_Defn_id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Cost_Defn_No] [varchar](20) NULL,
	[Cost_Defn_date] [datetime] NULL,
	[Order_No] [varchar](20) NULL,
	[Currencyid] [int] NULL,
	[ExchangeRate] [numeric](15, 5) NULL,
	[Remarks] [varchar](500) NULL,
	[Companyid] [int] NULL,
	[ProfitPercent] [numeric](5, 2) NULL,
	[CostArrived] [numeric](15, 5) NULL,
	[styleid] [int] NULL DEFAULT (null),
	[Approved] [varchar](1) NOT NULL DEFAULT ('N'),
	[AppDate] [datetime] NULL,
	[AppRemarks] [varchar](250) NULL,
	[AppCostArrived] [numeric](15, 5) NULL DEFAULT (0),
	[SalePrice] [numeric](15, 5) NULL DEFAULT (0),
	[Drawback_Percent] [numeric](5, 2) NOT NULL DEFAULT (0),
	[sale_Profit] [numeric](15, 5) NULL DEFAULT (0),
	[sale_Profit_percent] [numeric](15, 5) NOT NULL DEFAULT (0),
	[PcsWt] [numeric](15, 3) NULL,
	[Amend_Reason] [varchar](5) NOT NULL DEFAULT (''),
	[Amend] [char](1) NOT NULL DEFAULT ('N'),
	[first_budget] [bit] NULL DEFAULT (0),
	[CreatedBy] [int] NULL,
	[ApprovedBy] [int] NULL,
	[Verify] [varchar](1) NULL,
	CMCost numeric(15, 5) NULL,
	FinPer numeric(5, 2) NULL,
	MarkUpvalue numeric(15, 4) NULL,
	Gaficharges numeric(15, 4) NULL,
	Qizcharges numeric(15, 4) NULL,
	BuyerMerchendiser char(1) null,
	[ModifyBy] [int] NULL,
    [ModifyDate] [datetime] NULL,
	[PA] [char](1) NULL DEFAULT ('P'),

	 [ImpCharges] [numeric](15, 4) NULL,
	[ExpCharges] [numeric](15, 4) NULL,
	[FinPerValue] [numeric](15, 4) NULL,
	[GafichargesValue] [numeric](15, 4) NULL,
	[QizchargesValue] [numeric](15, 4) NULL,
	[ImpChargesValue] [numeric](15, 4) NULL,
	[ExpChargesValue] [numeric](15, 4) NULL,
	[ShipRate] [numeric](15, 4) NULL,
	[OrdValue] [numeric](15, 4) NULL,
	 CONSTRAINT [FK_Cost_defn_mas_ApprovedBy] FOREIGN KEY([ApprovedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),
	 CONSTRAINT [fk_cost_defn_mas_companyid] FOREIGN KEY([Companyid]) REFERENCES [dbo].[Company] ([CompanyId]),
	 CONSTRAINT [FK_Cost_Defn_mas_CreatedBy] FOREIGN KEY([CreatedBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),
	 CONSTRAINT [FK_Cost_defn_mas_ModifyBy] FOREIGN KEY([ModifyBy]) REFERENCES [dbo].[Employee] ([EmployeeId]),
	 CONSTRAINT [fk_cost_defn_mas_currencyid] FOREIGN KEY([Currencyid]) REFERENCES [dbo].[Currency] ([CurrencyId]),
	 CONSTRAINT [fk_cost_defn_mas_styleid] FOREIGN KEY([styleid]) REFERENCES [dbo].[StyleHeader] ([StyleId]),
)
