CREATE TABLE [dbo].[Cost_Defn_Com_Amend]
(
	CostDefnComAmndId int IDENTITY(1,1) NOT NULL primary key,
	[Cost_Defn_id] [int] NULL,
	[Cost_Defn_COMid] [int] NOT NULL ,
	[Particularid] [int] NULL,
	[Cost] [numeric](15, 5) NULL,
	[Type] [varchar](1) NULL,
	[Remarks] [varchar](100) NULL,
	[CostType] [varchar](1) NOT NULL DEFAULT ('V'),
	[AppCost] [numeric](15, 5) NULL  DEFAULT (0),
	[Actual_Cost] [numeric](15, 5) NULL  DEFAULT (0),
	[FirstRate] [numeric](15, 5) NULL  DEFAULT (0),

	CONSTRAINT [fk_cost_defn_am_com_commercialid] FOREIGN KEY([Particularid]) REFERENCES [dbo].[Commercialmas] ([commercialid]),
	--CONSTRAINT [fk_cost_defn_am_com_Cost_Defn_id] FOREIGN KEY([Cost_Defn_id]) REFERENCES [dbo].[Cost_Defn_Mas] ([Cost_Defn_id]),
)
